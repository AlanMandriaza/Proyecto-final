from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token, create_refresh_token

from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash


from app import db
from api.models import User, Category


user_api = Blueprint('user_api', __name__, url_prefix='/users')

@user_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    userName = user.first_name +' '+ user.last_name
    return jsonify({'message': 'Login successful', 'id': user.id, 'user': userName, 'access_token': access_token, 'refresh_token': refresh_token}), 200

@user_api.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id is None:
        return jsonify({'error': 'Authentication required'}), 401

    if user_id == current_user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Unauthorized access'}), 401




@user_api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400


    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password)
    user = User(email=email, password=hashed_password, first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
    userNameLogin = first_name + " " + last_name

    return jsonify({'message': 'User created successfully', "user": userNameLogin}), 201


@user_api.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.date_of_birth = data.get('date_of_birth', user.date_of_birth)
    user.address = data.get('address', user.address)
    user.city = data.get('city', user.city)
    user.country = data.get('country', user.country)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.avatar = data.get('avatar', user.avatar)

    db.session.commit()

    return jsonify(user.serialize()), 200

@user_api.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'}), 200

@user_api.route('/roles/<int:user_id>', methods=['GET'])
def get_user_roles(user_id):
    user = User.query.get_or_404(user_id)
    roles = [role.serialize() for role in user.roles]
    return jsonify(roles), 200

