from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, CartItem
from app.forms import OrderForm


orders_routes = Blueprint('orders', __name__)

@orders_routes.route('/create', methods=['POST'])
@login_required
def create_order():
    """
    Creates a new cart item
    """
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        order = Order(
            status = form.data['status'],
            user_id = current_user.id,
        )
        db.session.add(order)
        db.session.commit()

        return {"order": order.to_dict()}
    return {'errors': form.errors}, 401

@orders_routes.route('<int:id>/edit', methods=['PUT'])
@login_required
def edit_order(id):
    """
    Edit an order
    """
    form = OrderForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order.query.get(id)

        order.status=form.data['status']

        db.session.commit()

        return {"order": order.to_dict()}
    return {'errors': form.errors}, 401

@orders_routes.route('<int:id>/delete', methods=['DELETE'])
def delete_order(id):
    """
    Route to delete an order
    """
    order = Order.query.get(id)

    db.session.delete(order)
    db.session.commit()

    return {"message":"Delete successful"}

@orders_routes.route('/current')
def get_current_order():
    """
    Query for current user's order
    """
    order = Order.query.filter(
        Order.user_id == current_user.id,
        Order.status == 'in progress'
    ).first()


    if order is None:
        return {"order": None}


    return {"order":order.to_dict()}


@orders_routes.route('/<int:id>/cart-items')
def get_order_cart_items(id):
    """
    Query for an order's cart items
    """
    cart_items = CartItem.query.filter(CartItem.order_id == id)

    if cart_items is None:
        return {"cartItems": None}


    return {"cartItems":[cart_item.to_dict() for cart_item in cart_items]}
