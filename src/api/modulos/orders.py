from flask import Blueprint, jsonify, request
from datetime import datetime

from app import db
from models import Order, Payment, User

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')

@orders_bp.route('', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([o.serialize() for o in orders]), 200

@orders_bp.route('/<int:id>', methods=['GET'])
def get_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    return jsonify(order.serialize()), 200

@orders_bp.route('', methods=['POST'])
def create_order():
    data = request.json
    user_id = data.get('user_id')
    payment_amount = data.get('payment_amount')
    payment_id = create_payment(payment_amount)

    order = Order(user_id=user_id, payment_id=payment_id, created_at=datetime.utcnow())
    db.session.add(order)
    db.session.commit()
    return jsonify(order.serialize()), 201

@orders_bp.route('/<int:id>', methods=['PUT'])
def update_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    data = request.json
    order.user_id = data.get('user_id', order.user_id)
    order.payment_id = data.get('payment_id', order.payment_id)

    db.session.commit()
    return jsonify(order.serialize()), 200

@orders_bp.route('/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    db.session.delete(order)
    db.session.commit()
    return '', 204

def create_payment(amount):
    payment = Payment(amount=amount)
    db.session.add(payment)
    db.session.commit()
    return payment.id
