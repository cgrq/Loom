from flask import Blueprint, request
from flask_login import login_required
from app.models import db, CartItem
from app.forms import CartItemForm


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
            quantity=form.data['quantity'],
            product_id=form.data['productId'],
            order_id=form.data['orderId'],
        )
        db.session.add(cart_item)
        db.session.commit()

        return {"cartItem": cart_item.to_dict()}
    return {'errors': form.errors}, 401

@cart_item_routes.route('<int:id>/edit', methods=['PUT'])
@login_required
def edit_cart_item(id):
    """
    Edits a cart item
    """
    form = CartItemForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cart_item = CartItem.query.get(id)

        cart_item.quantity=form.data['quantity']

        db.session.commit()

        return {"cart_item": cart_item.to_dict()}
    return {'errors': form.errors}, 401

@cart_item_routes.route('<int:id>/delete', methods=['DELETE'])
def delete_cart_item(id):
    """
    Route to delete an cart item
    """
    cart_item = CartItem.query.get(id)

    db.session.delete(cart_item)
    db.session.commit()

    return {"message":"Delete successful"}
