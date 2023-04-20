from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import Cart, User, Product, CartItem

from app import db

cart_api = Blueprint('cart_api', __name__, url_prefix='/cart')

@cart_api.route('/items', methods=['POST'])
def create_cart_item():
    request_data = request.get_json()
    product = Product.query.get_or_404(request_data['product_id'])

    user_id = session.get('user_id')
    if user_id:
        cart = Cart.query.filter_by(user_id=user_id, ordered=False).first()
    else:
        cart_id = request_data.get('cart_id')
        cart = Cart.query.filter_by(id=cart_id, ordered=False).first()

    if not cart:
        user = User.query.get(user_id) if user_id else None
        cart = Cart(user=user)
        db.session.add(cart)
        db.session.commit()

    new_cart_item = CartItem(cart=cart, product=product, quantity=request_data['quantity'])
    db.session.add(new_cart_item)
    db.session.commit()

    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()
    cart_total = sum([item.product.price * item.quantity for item in cart_items])

    result = {
        'cart_item': new_cart_item.serialize(),
        'cart_total': cart_total
    }
    return jsonify(result), 200

@cart_api.route('/<int:cart_id>', methods=['GET'])
def get_cart(cart_id):
    cart = Cart.query.filter_by(id=cart_id, ordered=False).first()

    if not cart:
        return jsonify({'msg': 'Cart not found'}), 404

    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()
    cart_items_json = [item.serialize() for item in cart_items]

    cart_total = sum([item.product.price * item.quantity for item in cart_items])

    result = {
        'cart_items': cart_items_json,
        'cart_total': cart_total
    }
    return jsonify(result), 200

@cart_api.route('/<int:cart_id>', methods=['PUT'])
@jwt_required(optional=True)
def update_cart(cart_id):
    user_id = get_jwt_identity()
    session_cart_id = session.get('cart_id')

    if user_id:
        cart = Cart.query.filter_by(id=cart_id, user_id=user_id).first()
        if not cart:
            return jsonify({'msg': 'Cart not found'}), 404
    else:
        if not session_cart_id:
            return jsonify({'msg': 'Cart not found'}), 404
        elif session_cart_id != cart_id:
            return jsonify({'msg': 'Unauthorized access to cart'}), 401
        else:
            cart = Cart.query.get(cart_id)

    cart_items = request.json.get('items', [])
    product_ids = [item['product_id'] for item in cart_items]

    existing_cart_items = CartItem.query.filter_by(cart_id=cart_id).all()

    for cart_item in existing_cart_items:
        if cart_item.product_id not in product_ids:
            db.session.delete(cart_item)

    for item in cart_items:
        product_id = item['product_id']
        quantity = item['quantity']

        product = Product.query.get(product_id)

        if not product:
            return jsonify({'msg': 'Product not found'}), 404

        if quantity > product.stock:
            return jsonify({'msg': f'Not enough stock for product {product.name}'}), 400

        cart_item = CartItem.query.filter_by(
            cart_id=cart_id, product_id=product_id).first()

        if cart_item:
            cart_item.quantity = quantity
        else:
            cart_item = CartItem(cart=cart, product=product, quantity=quantity)
            db.session.add(cart_item)

    db.session.commit()

    return jsonify(cart.serialize()), 200
@cart_api.route('/<int:cart_id>', methods=['DELETE'])
@jwt_required(optional=True)
def delete_cart(cart_id):
    user_id = get_jwt_identity()

    if user_id:  # si el usuario está autenticado
        cart = Cart.query.filter_by(id=cart_id, user_id=user_id).first()
        if not cart:
            return jsonify({'msg': 'Cart not found'}), 404
    else:  # si el usuario no está autenticado
        cart_id = session.get('cart_id')
        if not cart_id:
            return jsonify({'msg': 'Cart not found'}), 404
        elif cart_id != cart_id:
            return jsonify({'msg': 'Unauthorized access to cart'}), 401
        else:
            cart = Cart.query.get(cart_id)

    # Eliminar los CartItem asociados al Cart que se está eliminando
    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()
    for cart_item in cart_items:
        db.session.delete(cart_item)

    db.session.delete(cart)
    db.session.commit()

    session.pop('cart_id', None)  # eliminar el ID del carrito de la sesión

    return jsonify({'msg': 'Cart deleted'}), 204
