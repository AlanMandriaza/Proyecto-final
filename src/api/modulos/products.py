from flask import Blueprint, jsonify, request
from sqlalchemy import exc

from app import db
from models import Product, Category

products_bp = Blueprint('products', __name__, url_prefix='/products')

@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if product:
        return jsonify(product.serialize()), 200
    else:
        return jsonify({"msg": "Product not found"}), 404

@products_bp.route('/', methods=['POST'])
def create_product():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image = data.get('image')
    category_id = data.get('category_id')
    quantity = data.get('quantity')

    # Verificar si la categoría existe
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"msg": f"Category with id {category_id} not found"}), 404

    # Crear el producto
    product = Product(name=name, description=description, price=price, image=image, category=category, quantity=quantity)

    try:
        db.session.add(product)
        db.session.commit()
        return jsonify(product.serialize()), 201
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 400

@products_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image = data.get('image')
    category_id = data.get('category_id')
    quantity = data.get('quantity')

    product = Product.query.get(id)

    if not product:
        return jsonify({"msg": "Product not found"}), 404

    # Verificar si la categoría existe
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"msg": f"Category with id {category_id} not found"}), 404

    # Actualizar el producto
    product.name = name
    product.description = description
    product.price = price
    product.image = image
    product.category = category
    product.quantity = quantity

    try:
        db.session.commit()
        return jsonify(product.serialize()), 200
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 400

@products_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({"msg": "Product not found"}), 404

    db.session.delete(product)

    try:
        db.session.commit()
        return jsonify({"msg": "Product deleted successfully"}), 200
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 400
