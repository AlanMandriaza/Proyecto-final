from flask import Blueprint, jsonify, request
from api.models import db, User


def get_all(resource_name, model_class):
    def get_all_items():
        all_items = model_class.query.all()
        result = [item.serialize() for item in all_items]
        return jsonify(result), 200
    return get_all_items


def create_api_blueprint(resource_name, model_class):
    api = Blueprint(resource_name, __name__)

    @api.route(f'/{resource_name}', methods=['GET'])
    def get_all_items():
        return get_all(resource_name, model_class)()

    @api.route(f'/{resource_name}/<int:item_id>', methods=['GET'])
    def get_single_item(item_id):
        item = model_class.query.filter_by(id=item_id).first()
        if item is None:
            return jsonify({'message': f'{resource_name.capitalize()} not found'}), 404
        return jsonify(item.serialize()), 200

    @api.route(f'/{resource_name}', methods=['POST'])
    def create_item():
        request_data = request.get_json()
        item = model_class(**request_data)
        db.session.add(item)
        db.session.commit()
        return jsonify({'message': f'{resource_name.capitalize()} created successfully'}), 201

    @api.route(f'/{resource_name}/<int:item_id>', methods=['PUT'])
    def update_item(item_id):
        item = model_class.query.filter_by(id=item_id).first()
        if item is None:
            return jsonify({'message': f'{resource_name.capitalize()} not found'}), 404
        request_data = request.get_json()
        for key, value in request_data.items():
            setattr(item, key, value)
        db.session.commit()
        return jsonify({'message': f'{resource_name.capitalize()} updated successfully'}), 200

    @api.route(f'/{resource_name}/int:item_id>', methods=['DELETE'])
    def delete_item(item_id):
        item = model_class.query.filter_by(id=item_id).first()
        if item is None:
            return jsonify({'message': f'{resource_name.capitalize()} not found'}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': f'{resource_name.capitalize()} deleted successfully'}), 200

    return api

api = create_api_blueprint("users", User)
