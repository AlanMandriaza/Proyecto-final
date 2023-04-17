from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import Cart, User, Product, CartItem
from app import db
from flask import session

cart_api = Blueprint('cart_api', __name__, url_prefix='/cart')

@cart_api.route('', methods=['POST'])
def create_cart():
    current_user_id = session.get('user_id')
    user = User.query.get(current_user_id) if current_user_id else None

    cart = Cart(user=user)
    db.session.add(cart)
    db.session.commit()

    return jsonify(cart.serialize()), 201

@cart_api.route('/<int:cart_id>', methods=['GET'])
@jwt_required()
def get_cart(cart_id):
    current_user_id = get_jwt_identity()
    cart = Cart.query.filter_by(id=cart_id, user_id=current_user_id).first()

    if not cart:
        return jsonify({'msg': 'Cart not found'}), 404

    return jsonify(cart.serialize()), 200


@cart_api.route('/<int:cart_id>', methods=['PUT'])
@jwt_required()
def update_cart(cart_id):
    current_user_id = get_jwt_identity()
    cart = Cart.query.filter_by(id=cart_id, user_id=current_user_id).first()

    if not cart:
        return jsonify({'msg': 'Cart not found'}), 404

    cart_items = request.json.get('items')

    for item in cart_items:
        product_id = item['product_id']
        quantity = item['quantity']

        product = Product.query.get(product_id)

        if not product:
            return jsonify({'msg': 'Product not found'}), 404

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
@jwt_required()
def delete_cart(cart_id):
    current_user_id = get_jwt_identity()
    cart = Cart.query.filter_by(id=cart_id, user_id=current_user_id).first()

    if not cart:
        return jsonify({'msg': 'Cart not found'}), 404

    db.session.delete(cart)
    db.session.commit()

    return '', 204
