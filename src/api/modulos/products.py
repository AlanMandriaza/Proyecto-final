from flask import Blueprint, jsonify, request
from sqlalchemy import exc
from api.models import Product, Category
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
    data_list = request.get_json()
    result_list = []
    for data in data_list:
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        image = data.get('image')
        category_name = data.get('category')
        quantity = data.get('quantity')

        # Verificar si la categoría existe
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            return jsonify({"msg": f"Category with name {category_name} not found"}), 404

        # Crear el producto
        product = Product(name=name, description=description, price=price, image=image, category=category, quantity=quantity)

        try:
            db.session.add(product)
            db.session.commit()
            result_list.append(product.serialize())
        except exc.SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Products created successfully", "products": result_list}), 201


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

    product.quantity = data.get('quantity', old_quantity)

    db.session.commit()

    # Comparamos los valores nuevos con los antiguos para saber si se han modificado
    if (product.name != old_name or
        product.description != old_description or
        product.price != old_price or
        product.image != old_image or
        product.category != old_category or
        product.quantity != old_quantity):

        return jsonify({"mensaje": "Producto actualizado exitosamente"}), 200

    else:
        return jsonify({"mensaje": "El producto no ha sido modificado"}), 200
