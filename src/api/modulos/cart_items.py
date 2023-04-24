from flask import Blueprint, jsonify, request, session
from app import db
from api.models import Cart, Product, CartItem, User
from sqlalchemy import text

cart_items_api = Blueprint('cart_items_api', __name__, url_prefix='/cart_items')

# Endpoint para crear un nuevo item de carrito
# Endpoint para crear un nuevo item de carrito
@cart_items_api.route('', methods=['POST'])
def create_cart_item():
    # Obtener los datos del item de carrito a través del JSON de la solicitud
    request_data = request.get_json()

    # Verificar si el producto existe
    product = Product.query.get_or_404(request_data['product_id'])

    # Obtener el ID del carrito desde la sesión del usuario
    user_id = session.get('user_id')
    cart = Cart.query.filter_by(user_id=user_id, ordered=False).first()

    # Crear un nuevo carrito si no se encontró uno existente
    if not cart:
        user = User.query.get(user_id) if user_id else None
        cart = Cart(user=user)
        db.session.add(cart)
        db.session.commit()
        msg = 'Cart created'
    else:
        msg = 'Cart found'

    # Crear el nuevo item de carrito
    new_cart_item = CartItem(cart=cart, product=product, quantity=request_data['quantity'])
    db.session.add(new_cart_item)
    db.session.commit()

    # Retornar el item de carrito creado como JSON
    result = new_cart_item.serialize()
    return jsonify(result), 201, {'msg': msg}


@cart_items_api.route('/<int:product_id>', methods=['DELETE'])
def delete_cart_items_by_product(product_id):
    # Obtener los items de carrito para ese producto
    cart_items = CartItem.query.filter_by(product_id=product_id).all()

    # Eliminar los items de carrito de la base de datos
    for cart_item in cart_items:
        db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'msg': f'Cart items with product ID {product_id} deleted.'}), 200




@cart_items_api.route('/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    # Obtener el item de carrito a través del ID
    cart_item = CartItem.query.get_or_404(item_id)

    # Disminuir la cantidad del item de carrito en 1
    cart_item.quantity -= 1

    # Verificar si la cantidad del item de carrito llegó a cero
    if cart_item.quantity == 0:
        # Eliminar el item de carrito de la base de datos
        db.session.delete(cart_item)
        
        # Ejecutar una consulta SQL directamente para eliminar el cart_item de la base de datos
        db.session.execute(text(f"DELETE FROM cart_items WHERE id = {item_id}"))
        db.session.commit()

        return jsonify({'msg': 'Cart item deleted using SQL directly.'}), 200
    else:
        # Si la cantidad del item de carrito no llegó a cero, simplemente guardar los cambios en la base de datos
        db.session.commit()

        # Retornar el item de carrito como JSON
        result = cart_item.serialize()
        return jsonify(result), 200, {'msg': 'Cart item updated'}



@cart_items_api.route('/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    # Obtener el item de carrito a través del ID
    cart_item = CartItem.query.get_or_404(item_id)

    # Actualizar la cantidad del item de carrito
    request_data = request.get_json()
    quantity = request_data.get('quantity')
    if quantity is None:
        return jsonify({'error': 'Quantity is missing.'}), 400
    cart_item.quantity = quantity

    # Guardar los cambios en la base de datos
    db.session.commit()

    # Retornar el item de carrito actualizado como JSON
    result = cart_item.serialize()
    return jsonify(result), 200, {'msg': 'Cart item updated'}
