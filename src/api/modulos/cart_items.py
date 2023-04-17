from flask import Blueprint, jsonify, request
from app import db
from api.models import Cart, Product, CartItem

cart_items_api = Blueprint('cart_items_api', __name__, url_prefix='/carts/<int:cart_id>/items')

# Endpoint para crear un nuevo item de carrito
@cart_items_api.route('', methods=['POST'])
def create_cart_item(cart_id):
    # Verificar si el carrito existe
    cart = Cart.query.get_or_404(cart_id)

    # Obtener los datos del item de carrito a través del JSON de la solicitud
    request_data = request.get_json()

    # Verificar si el producto existe
    product = Product.query.get_or_404(request_data['product_id'])

    # Crear el nuevo item de carrito
    new_cart_item = CartItem(cart_id=cart_id, product_id=request_data['product_id'], quantity=request_data['quantity'])
    db.session.add(new_cart_item)
    db.session.commit()

    # Retornar el item de carrito creado como JSON
    result = {
        'id': new_cart_item.id,
        'cart_id': new_cart_item.cart_id,
        'product_id': new_cart_item.product_id,
        'quantity': new_cart_item.quantity
    }
    return jsonify(result)

# Endpoint para actualizar un item de carrito existente
@cart_items_api.route('/<int:item_id>', methods=['PUT'])
def update_cart_item(cart_id, item_id):
    # Verificar si el carrito existe
    Cart.query.get_or_404(cart_id)

    # Verificar si el item de carrito existe
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart_id).first_or_404()

    # Obtener los datos actualizados del item de carrito a través del JSON de la solicitud
    request_data = request.get_json()

    # Actualizar los datos del item de carrito y guardarlos en la base de datos
    cart_item.product_id = request_data['product_id']
    cart_item.quantity = request_data['quantity']
    db.session.commit()

    # Retornar el item de carrito actualizado como JSON
    result = {
        'id': cart_item.id,
        'cart_id': cart_item.cart_id,
        'product_id': cart_item.product_id,
        'quantity': cart_item.quantity
    }
    return jsonify(result)

# Endpoint para eliminar un item de carrito existente
@cart_items_api.route('/<int:item_id>', methods=['DELETE'])
def delete_cart_item(cart_id, item_id):
    # Verificar si el carrito existe
    Cart.query.get_or_404(cart_id)

    # Verificar si el item de carrito existe
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart_id).first_or_404()

    # Eliminar el item de carrito de la base de datos
    db.session.delete(cart_item)
    db.session.commit()

    # Retornar una respuesta vacía con un código de estado 204 (sin contenido)
    return '', 204
