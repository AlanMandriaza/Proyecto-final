from flask import Blueprint, jsonify, request
from sqlalchemy import exc
from api.models import Product, Category, Genere
from app import db

product_api = Blueprint('product_api', __name__, url_prefix='/products')

@product_api.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200

@product_api.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if product:
        return jsonify(product.serialize()), 200
    else:
        return jsonify({"msg": "Product not found"}), 404

@product_api.route('/', methods=['POST'])
def create_products():
    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({"error": "Data must be a dictionary"}), 400

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image = data.get('image')
    genere_name = data.get('genere')
    category_name = data.get('category')
    quantity = data.get('quantity')

    # Verificar si la categoría existe
    category = Category.query.filter_by(name=category_name).first()
    if not category:
        return jsonify({"error": f"Category with name '{category_name}' not found"}), 404

    genere = Genere.query.filter_by(name=genere_name).first()
    if not genere:
        return jsonify({"error" : f"Genere with name '{genere_name}' not found"}), 400    

    # Crear el producto
    product = Product(name=name, description=description, price=price, image=image, genere=genere, category=category, quantity=quantity)

    try:
        db.session.add(product)
        db.session.commit()
        return jsonify({"message": "Producto creado", "product": product.serialize()}), 201
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400




@product_api.route('/<int:id>', methods=['DELETE'])
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



@product_api.route('/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()

    product = Product.query.get(id)

    if not product:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

    # Guardamos los valores antiguos para compararlos después
    old_name = product.name
    old_description = product.description
    old_price = product.price
    old_image = product.image
    old_genere = product.genere
    old_category = product.category
    old_quantity = product.quantity

    # Actualizar el producto
    product.name = data.get('name', old_name)
    product.description = data.get('description', old_description)
    product.price = data.get('price', old_price)
    product.image = data.get('image', old_image)
    
    category_name = data.get('category')
    if category_name and category_name != old_category.name:
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            category = Category(name=category_name)
            db.session.add(category)
        product.category = category

    genere_name = data.get('genere')
    if genere_name and genere_name != old_genere.name:
        genere = Genere.query.filter_by(name=genere_name).first()
        if not genere:
            genere = Genere(name=genere_name)
            db.session.add(genere)
        product.genere = genere        

    product.quantity = data.get('quantity', old_quantity)

    db.session.commit()

    # Comparamos los valores nuevos con los antiguos para saber si se han modificado
    if (product.name != old_name or
        product.description != old_description or
        product.price != old_price or
        product.image != old_image or
        product.genere != old_genere or
        product.category != old_category or
        product.quantity != old_quantity):

        return jsonify({"mensaje": "Producto actualizado exitosamente"}), 200

    else:
        return jsonify({"mensaje": "El producto no ha sido modificado"}), 200


@product_api.route('/<int:id>/add', methods=['PUT'])
def add_product_quantity(id):
    data = request.get_json()
    quantity = data.get('quantity', 1)
    
    product = Product.query.get(id)
    if not product:
        return jsonify({"msg": "Product not found"}), 404

    product.quantity += quantity
    db.session.commit()

    return jsonify(product.serialize()), 200


@product_api.route('/<int:id>/remove', methods=['PUT'])
def remove_product_quantity(id):
    data = request.get_json()
    quantity = data.get('quantity', 1)
    
    product = Product.query.get(id)
    if not product:
        return jsonify({"msg": "Product not found"}), 404

    product.quantity -= quantity
    if product.quantity < 0:
        product.quantity = 0

    db.session.commit()

    return jsonify(product.serialize()), 200
