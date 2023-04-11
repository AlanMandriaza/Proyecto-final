from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    roles = db.relationship('Role', secondary='user_roles')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Role {self.name}>'

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)

    def __repr__(self):
        return f'<UserRole {self.user_id}-{self.role_id}>'



class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=True)
    price = db.Column(db.Float, nullable=False)
    categories = db.relationship(
        "Category",
        secondary="product_category",
        backref=db.backref("products", lazy=True),
    )
    payments = db.relationship(
        "Payment",
        secondary="payment_product",
        backref=db.backref("products", lazy=True),
    )

    def __repr__(self):
        return f"<Product {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
        }


class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Category {self.name}>"

    def serialize(self):
        return {"id": self.id, "name": self.name}


product_category = db.Table(
    "product_category",
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),
    db.Column(
        "category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True
    ),
)

payment_product = db.Table(
    "payment_product",
    db.Column("payment_id", db.Integer, db.ForeignKey("payments.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),
)

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, nullable=False)
    payment_status = db.Column(db.String(20), nullable=False)
    card_number = db.Column(db.String(16), nullable=False)
    card_expiration_date = db.Column(db.String(5), nullable=False)
    card_security_code = db.Column(db.String(3), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    billing_address = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    products = db.relationship('Product', secondary='payment_product', backref=db.backref('payments', lazy=True))

    def __repr__(self):
        return f'<Payment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "amount": self.amount,
            "payment_date": self.payment_date.strftime('%Y-%m-%d %H:%M:%S'),
            "payment_status": self.payment_status,
            "card_number": self.card_number,
            "card_expiration_date": self.card_expiration_date,
            "cvv": self.cvv,
            "country": self.country,
            "age": self.age,
            "billing_address": self.billing_address,
            "full_name": self.full_name,
            "products": [product.serialize() for product in self.products]
        }

class Cart(db.Model):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Float, nullable=False)
    product = db.relationship('Product', backref='carts')

    def __repr__(self):
        return f'<Cart {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "value": self.value,
            "product": self.product.serialize()
        }
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    payment = db.relationship('Payment', backref='orders')

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "payment_id": self.payment_id,
            "order_date": self.order_date.strftime('%Y-%m-%d %H:%M:%S'),
            "total_amount": self.total_amount,
            "payment": self.payment.serialize()
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "user_id": self.user_id,
            "rating": self.rating,
            "comment": self.comment
        }