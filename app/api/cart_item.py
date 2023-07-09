from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem
from sqlalchemy import desc
from app.forms import CartItemForm
from app.api.aws_helper_routes import upload_file_to_s3, get_uniquefilename, delete_image


cart_item_routes = Blueprint('cart_items', __name__)

@cart_item_routes.route('/create', methods=['POST'])
@login_required
def create_cart_item():
    """
    Creates a new cart item
    """
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart_item = CartItem(
            quantity=form.data['name'],
            storefront_id=form.data['storefrontId'],
        )
        db.session.add(cart_item)
        db.session.commit()

        return {"cartItem": cart_item.to_dict()}
    return {'errors': form.errors}, 401
