from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import User

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)

    storefront_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("storefronts.id"), ondelete="CASCADE"), nullable=False)

    cart_items = db.relationship(
        "CartItem", back_populates="orders", cascade="all, delete-orphan")

    user = db.relationship('User', back_populates="orders")
    storefront = db.relationship('Storefront', back_populates="orders")

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'userId': self.user_id,
            'storefrontId': self.storefront_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
