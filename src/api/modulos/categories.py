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

@category_api.route('', methods=['POST'])
def create_category():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos'}), 400
    
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Falta el nombre de la categoría'}), 400
    
    category = Category(name=name)
    db.session.add(category)
    db.session.commit()
    serialized_category = category.serialize()
    return jsonify(serialized_category), 201

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


#https://3001-alanmandria-proyectofin-dhrgwg8k4gb.ws-us94.gitpod.io/api/categories
#{"name": "Nueva categoría"}
