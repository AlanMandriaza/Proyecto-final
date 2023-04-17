from flask import Blueprint
from api.modulos.users import user_api
from api.modulos.categories import category_api
from api.modulos.roles import role_api
from api.modulos.products import product_api
# from api.modulos.payment_items import payment_item_api
# from api.modulos.payments import payment_api
# from api.modulos.orders import order_api
# from api.modulos.reviews import review_api
from api.modulos.cart import cart_api
from api.modulos.cart_items import cart_items_api

api_bp = Blueprint('api', __name__)

api_bp.register_blueprint(user_api)
api_bp.register_blueprint(role_api)
api_bp.register_blueprint(category_api)
api_bp.register_blueprint(product_api)
# api_bp.register_blueprint(payment_item_api)
# api_bp.register_blueprint(payment_api)
# api_bp.register_blueprint(order_api)
# api_bp.register_blueprint(review_api)
api_bp.register_blueprint(cart_api)
api_bp.register_blueprint(cart_items_api)
