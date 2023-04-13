from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt

from flask_jwt_extended import create_access_token, jwt_required

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


# Signup endpoint
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    date_of_birth = data.get('date_of_birth')
    address = data.get('address')
    city = data.get('city')
    country = data.get('country')
    phone_number = data.get('phone_number')
    avatar = data.get('avatar')

    if not email or not password:
        raise APIException('Email and password are required', status_code=400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException('User already exists', status_code=409)

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(email=email, password=hashed_password, is_active=True, first_name=first_name, last_name=last_name,
                    date_of_birth=date_of_birth, address=address, city=city, country=country, phone_number=phone_number, avatar=avatar)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/')
def home():
    return 'API is working'


@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    return generate_sitemap(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
