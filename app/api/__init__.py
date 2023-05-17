from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .storefront_routes import storefront_routes

api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(user_routes, url_prefix='/users')
api.register_blueprint(storefront_routes, url_prefix='/storefronts')
