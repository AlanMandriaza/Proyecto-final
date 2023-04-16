from flask import Blueprint, jsonify, request
from app import db
from models import Payment

payments_bp = Blueprint('payments_bp', __name__)


@payments_bp.route('/payments', methods=['GET'])
def get_all_payments():
    payments = Payment.query.all()
    return jsonify([p.serialize() for p in payments]), 200


@payments_bp.route('/payments/<int:payment_id>', methods=['GET'])
def get_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if payment:
        return jsonify(payment.serialize()), 200
    else:
        return jsonify({'error': 'Payment not found'}), 404


@payments_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.json
    if 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400

    payment = Payment(amount=data['amount'])
    db.session.add(payment)
    db.session.commit()

    return jsonify(payment.serialize()), 201


@payments_bp.route('/payments/<int:payment_id>', methods=['PUT'])
def update_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if payment:
        data = request.json
        payment.amount = data.get('amount', payment.amount)
        db.session.commit()
        return jsonify(payment.serialize()), 200
    else:
        return jsonify({'error': 'Payment not found'}), 404


@payments_bp.route('/payments/<int:payment_id>', methods=['DELETE'])
def delete_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if payment:
        db.session.delete(payment)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'error': 'Payment not found'}), 404
