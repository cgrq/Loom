from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .storefront_routes import storefront_routes
from .product_routes import product_routes
from .reviews_routes import review_routes
from .cart_item_routes import cart_item_routes
from .orders_routes import orders_routes

api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(user_routes, url_prefix='/users')
api.register_blueprint(storefront_routes, url_prefix='/storefronts')
api.register_blueprint(product_routes, url_prefix='/products')
api.register_blueprint(review_routes, url_prefix='/reviews')
api.register_blueprint(cart_item_routes, url_prefix='/cart-items')
api.register_blueprint(orders_routes, url_prefix='/orders')
