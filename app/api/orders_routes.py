from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order
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
            storefront_id = form.data['storefrontId'],
        )
        db.session.add(order)
        db.session.commit()

        return {"order": order.to_dict()}
    return {'errors': form.errors}, 401

@orders_routes.route('<int:id>/edit', methods=['PUT'])
@login_required
def edit_order(id):
    """
    Edits a order
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
