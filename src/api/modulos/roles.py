from flask import Blueprint, jsonify, request
from app import db
from api.models import Role

role_api = Blueprint('roles', __name__, url_prefix='/roles')

@role_api.route('/', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.serialize() for role in roles]), 200

@role_api.route('/<int:id>', methods=['GET'])
def get_role(id):
    role = Role.query.get_or_404(id)
    return jsonify(role.serialize()), 200

@role_api.route('/', methods=['POST'])
def create_role():
    name = request.json.get('name')

    if not name:
        return jsonify({"msg": "El nombre del rol es requerido"}), 400

    existing_role = Role.query.filter_by(name=name).first()
    if existing_role:
        return jsonify({"msg": "El rol ya existe"}), 409

    role = Role(name=name)
    db.session.add(role)
    db.session.commit()

    return jsonify(role.serialize()), 201


@role_api.route('/<int:id>', methods=['PUT'])
def update_role(id):
    role = Role.query.get_or_404(id)
    name = request.json.get('name')

    if not name:
        return jsonify({"msg": "El nombre del rol es requerido"}), 400

    if name == role.name:
        return jsonify({"msg": "El nombre del rol no ha cambiado"}), 400

    role.name = name
    db.session.commit()

    return jsonify({'message': 'Rol modificado exitosamente'}), 200



@role_api.route('/<int:id>', methods=['DELETE'])
def delete_role(id):
    role = Role.query.get_or_404(id)
    db.session.delete(role)
    db.session.commit()

    return jsonify({'message': 'Rol eliminado correctamente'}), 200




