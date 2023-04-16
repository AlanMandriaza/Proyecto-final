from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from sqlalchemy import exc

from app import db
from models import PaymentItem, Product

payment_items_bp = Blueprint('payment_items_bp', __name__)


@payment_items_bp.route('/payment_items', methods=['GET'])
@jwt_required()
def get_payment_items():
    payment_items = PaymentItem.query.all()
    return jsonify([payment_item.serialize() for payment_item in payment_items]), 200


@payment_items_bp.route('/payment_items/<int:payment_item_id>', methods=['GET'])
@jwt_required()
def get_payment_item(payment_item_id):
    payment_item = PaymentItem.query.get(payment_item_id)
    if payment_item:
        return jsonify(payment_item.serialize()), 200
    else:
        return jsonify({'message': 'Payment item not found'}), 404


@payment_items_bp.route('/payment_items', methods=['POST'])
@jwt_required()
def create_payment_item():
    try:
        product_id = request.json.get('product_id')
        quantity = request.json.get('quantity')

        if not all([product_id, quantity]):
            return jsonify({'message': 'Missing parameters'}), 400

        product = Product.query.get(product_id)
        if not product:
            return jsonify({'message': 'Product not found'}), 404

        payment_item = PaymentItem(product=product, quantity=quantity)
        db.session.add(payment_item)
        db.session.commit()

        return jsonify(payment_item.serialize()), 201
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Product already added to payment'}), 400
    except ValueError:
        db.session.rollback()
        return jsonify({'message': 'Invalid quantity parameter'}), 400


@payment_items_bp.route('/payment_items/<int:payment_item_id>', methods=['PUT'])
@jwt_required()
def update_payment_item(payment_item_id):
    payment_item = PaymentItem.query.get(payment_item_id)
    if not payment_item:
        return jsonify({'message': 'Payment item not found'}), 404

    try:
        product_id = request.json.get('product_id')
        quantity = request.json.get('quantity')

        if not all([product_id, quantity]):
            return jsonify({'message': 'Missing parameters'}), 400

        product = Product.query.get(product_id)
        if not product:
            return jsonify({'message': 'Product not found'}), 404

        payment_item.product = product
        payment_item.quantity = quantity
        db.session.commit()

        return jsonify(payment_item.serialize()), 200
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Product already added to payment'}), 400
    except ValueError:
        db.session.rollback()
        return jsonify({'message': 'Invalid quantity parameter'}), 400


@payment_items_bp.route('/payment_items/<int:payment_item_id>', methods=['DELETE'])
@jwt_required()
def delete_payment_item(payment_item_id):
    payment_item = PaymentItem.query.get(payment_item_id)
    if payment_item:
        db.session.delete(payment_item)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'message': 'Payment item not found'}), 404
