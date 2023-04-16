from flask import Blueprint, jsonify, request
from app import db
from models import Review, User, Product

reviews_bp = Blueprint('reviews', __name__, url_prefix='/api')

@reviews_bp.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews_by_product(product_id):
    """Obtiene todas las reseñas de un producto en particular"""

    # Buscar el producto en la base de datos
    product = Product.query.filter_by(id=product_id).first()

    # Si el producto no existe, responder con un error 404
    if not product:
        return jsonify({'error': 'Producto no encontrado'}), 404

    # Obtener todas las reseñas del producto
    reviews = product.reviews

    # Serializar los datos de las reseñas y responder con un JSON
    return jsonify([r.serialize() for r in reviews])

@reviews_bp.route('/reviews', methods=['POST'])
def create_review():
    """Crea una nueva reseña"""

    # Obtener los datos de la petición
    data = request.get_json()

    # Buscar el usuario que está creando la reseña en la base de datos
    user = User.query.filter_by(id=data['user_id']).first()

    # Si el usuario no existe, responder con un error 404
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    # Buscar el producto que se está reseñando en la base de datos
    product = Product.query.filter_by(id=data['product_id']).first()

    # Si el producto no existe, responder con un error 404
    if not product:
        return jsonify({'error': 'Producto no encontrado'}), 404

    # Crear la nueva reseña
    review = Review(user=user, product=product, comment=data['comment'], rating=data['rating'])

    # Agregar la reseña a la base de datos
    db.session.add(review)
    db.session.commit()

    # Responder con los datos de la reseña creada en formato JSON
    return jsonify(review.serialize())

@reviews_bp.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    """Actualiza una reseña existente"""

    # Obtener los datos de la petición
    data = request.get_json()

    # Buscar la reseña en la base de datos
    review = Review.query.filter_by(id=review_id).first()

    # Si la reseña no existe, responder con un error 404
    if not review:
        return jsonify({'error': 'Reseña no encontrada'}), 404

    # Actualizar los datos de la reseña
    review.comment = data['comment']
    review.rating = data['rating']

    # Actualizar la reseña en la base de datos
    db.session.commit()

    # Responder con los datos de la reseña actualizada en formato JSON
    return jsonify(review.serialize())

@reviews_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    """Elimina una reseña existente"""

    # Buscar la reseña en la base de datos
    review = Review.query.filter_by(id=review_id).first()

    # Si la reseña no existe, responder con un error 404
    if not review:
        return jsonify({'error': 'Reseña no encontrada'}),
