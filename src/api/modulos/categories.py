from flask import Blueprint, jsonify, request
from app import db
from models import Category, Product

categories_bp = Blueprint('categories', __name__, url_prefix='/categories')

# Endpoint para obtener todas las categorías
@categories_bp.route('', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    serialized_categories = [category.serialize() for category in categories]
    return jsonify(serialized_categories), 200

# Endpoint para obtener una categoría por su ID
@categories_bp.route('/<int:id>', methods=['GET'])
def get_category(id):
    category = Category.query.get(id)
    if category:
        serialized_category = category.serialize()
        return jsonify(serialized_category), 200
    else:
        return jsonify({'error': 'Categoría no encontrada'}), 404

# Endpoint para crear una nueva categoría
@categories_bp.route('', methods=['POST'])
def create_category():
    name = request.json.get('name')
    if name:
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()
        serialized_category = category.serialize()
        return jsonify(serialized_category), 201
    else:
        return jsonify({'error': 'Falta el nombre de la categoría'}), 400

# Endpoint para actualizar una categoría existente por su ID
@categories_bp.route('/<int:id>', methods=['PUT'])
def update_category(id):
    category = Category.query.get(id)
    if category:
        name = request.json.get('name')
        if name:
            category.name = name
            db.session.commit()
            serialized_category = category.serialize()
            return jsonify(serialized_category), 200
        else:
            return jsonify({'error': 'Falta el nombre de la categoría'}), 400
    else:
        return jsonify({'error': 'Categoría no encontrada'}), 404

# Endpoint para eliminar una categoría existente por su ID
@categories_bp.route('/<int:id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get(id)
    if category:
        # Primero eliminamos los productos de esta categoría
        products = Product.query.filter_by(category_id=id).all()
        for product in products:
            db.session.delete(product)
        # Luego eliminamos la categoría
        db.session.delete(category)
        db.session.commit()
        return jsonify({'message': 'Categoría eliminada correctamente'}), 200
    else:
        return jsonify({'error': 'Categoría no encontrada'}), 404
