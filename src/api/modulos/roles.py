from flask import Blueprint, jsonify, request
from app import db
from models import Role

roles_bp = Blueprint('roles', __name__, url_prefix='/roles')

@roles_bp.route('/', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.serialize() for role in roles]), 200

@roles_bp.route('/<int:id>', methods=['GET'])
def get_role(id):
    role = Role.query.get_or_404(id)
    return jsonify(role.serialize()), 200

@roles_bp.route('/', methods=['POST'])
def create_role():
    name = request.json.get('name')

    if not name:
        return jsonify({"msg": "El nombre del rol es requerido"}), 400

    role = Role(name=name)
    db.session.add(role)
    db.session.commit()

    return jsonify(role.serialize()), 201

@roles_bp.route('/<int:id>', methods=['PUT'])
def update_role(id):
    role = Role.query.get_or_404(id)
    name = request.json.get('name')

    if not name:
        return jsonify({"msg": "El nombre del rol es requerido"}), 400

    role.name = name
    db.session.commit()

    return jsonify(role.serialize()), 200

@roles_bp.route('/<int:id>', methods=['DELETE'])
def delete_role(id):
    role = Role.query.get_or_404(id)
    db.session.delete(role)
    db.session.commit()

    return '', 204
