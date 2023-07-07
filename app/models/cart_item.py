from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    # Foreign Keys
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id"), ondelete="CASCADE"), nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("orders.id"), ondelete="CASCADE"), nullable=False)

    product = db.relationship('Product', back_populates="cart_items")
    order = db.relationship('Order', back_populates="cart_items")

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'productId': self.product_id,
            'orderId': self.order_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
