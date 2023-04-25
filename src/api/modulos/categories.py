from flask import Blueprint, jsonify, request
from app import db
from api.models import Category

category_api = Blueprint('category_api', __name__, url_prefix='/categories')

@category_api.route('', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    serialized_categories = [category.serialize() for category in categories]
    return jsonify(serialized_categories), 200

@category_api.route('/<int:id>', methods=['GET'])
def get_category(id):
    category = Category.query.get(id)
    if category:
        serialized_category = category.serialize()
        return jsonify(serialized_category), 200
    else:
        return jsonify({'error': 'Categoría no encontrada'}), 404

@category_api.route('/', methods=['POST'])
def create_category():
    data = request.json
    if not data or 'name' not in data:
        return jsonify({'error': 'Invalid category data'}), 400
    
    name = data['name']
    if not isinstance(name, str) or len(name) == 0:
        return jsonify({'error': 'Invalid category name'}), 400
    
    category = Category(name=name)
    db.session.add(category)
    db.session.commit()
    
    serialized_category = category.serialize()
    return jsonify({'success': 'Category created', 'category': serialized_category}), 201




@category_api.route('/<int:id>', methods=['PUT'])
def update_category(id):
    category = Category.query.get(id)
    if not category:
        return jsonify({'error': 'Categoría no encontrada'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Falta el nombre de la categoría'}), 400
    
    category.name = name
    db.session.commit()
    serialized_category = category.serialize()
    return jsonify(serialized_category), 200

@category_api.route('/<int:id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get(id)
    if not category:
        return jsonify({'error': 'Categoría no encontrada'}), 404
    
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Categoría eliminada correctamente'}), 200


@category_api.route('/<int:category_id>/products', methods=['GET'])
def get_products_by_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'error': 'Categoría no encontrada'}), 404

    products = category.products
    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products), 200

@category_api.route('/<int:id>/product_count', methods=['GET'])
def get_product_count_by_category(id):
    category = Category.query.get(id)
    if not category:
        return jsonify({'error': 'Categoría no encontrada'}), 404

    product_count = len(category.products)
    return jsonify({'product_count': product_count}), 200
