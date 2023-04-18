from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from datetime import datetime, timedelta

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    first_name = db.Column(db.String(50), unique=False, nullable=True)
    last_name = db.Column(db.String(50), unique=False, nullable=True)
    date_of_birth = db.Column(db.Date(), unique=False, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(80), unique=False, nullable=True)
    country = db.Column(db.String(80), unique=False, nullable=True)
    phone_number = db.Column(db.String(20), unique=False, nullable=True)
    avatar = db.Column(db.String(120), unique=False, nullable=True)
    roles = db.relationship('Role', secondary='user_roles')

    def __init__(self, email, password, is_active=True, first_name=None, last_name=None, date_of_birth=None,
                 address=None, city=None, country=None, phone_number=None, avatar=None, **kwargs):
        self.email = email
        self.password = password
        self.is_active = is_active
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.address = address
        self.city = city
        self.country = country
        self.phone_number = phone_number
        self.avatar = avatar
        super(User, self).__init__(**kwargs)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date_of_birth": self.date_of_birth.strftime('%Y-%m-%d') if self.date_of_birth else None,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "phone_number": self.phone_number,
            "avatar": self.avatar
        }


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Role {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    user_id = db.Column(db.Integer, ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, ForeignKey('roles.id'), primary_key=True)

    def __repr__(self):
        return f'<UserRole {self.user_id}-{self.role_id}>'

    def serialize(self):
        return {
            'user_id': self.user_id,
            'role_id': self.role_id
        }


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(500), nullable=False)
    category_id = db.Column(db.Integer, ForeignKey('categories.id'))
    category = db.relationship('Category', backref=db.backref('products', lazy=True))
    quantity = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image": self.image,
            "category": self.category.name,
            "quantity": self.quantity
        }


class PaymentItem(db.Model):
    __tablename__ = 'payment_items'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, ForeignKey('products.id'))
    product = db.relationship('Product')
    quantity = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<PaymentItem {self.id}>'

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Payment {self.id}>'


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'))
    payment = db.relationship('Payment', backref=db.backref('orders', lazy=True))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Order {self.id}>'

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship('Product', backref=db.backref('reviews', lazy=True))
    comment = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Review {self.id}>'



class Cart(db.Model):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    user = db.relationship('User', backref='carts')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ordered = db.Column(db.Boolean(), nullable=False, default=False)
    items = db.relationship('CartItem', backref='cart', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat(),
            'ordered': self.ordered,
            'items': [item.serialize() for item in self.items]
        }



class CartItem(db.Model):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product')

    def __repr__(self):
        return f'<CartItem {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'product': self.product.serialize(),
            'quantity': self.quantity
        }
