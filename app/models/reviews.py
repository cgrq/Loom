from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import User

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = (db.UniqueConstraint('user_id', 'product_id'), {'schema': SCHEMA})

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    message = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    # Foreign Keys
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id"), ondelete="CASCADE"), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)

    product = db.relationship('Product', back_populates="reviews")
    user = db.relationship('User', back_populates="reviews")

    def to_dict(self):
        user = User.query.get(self.user_id)
        return {
            'id': self.id,
            'rating': self.rating,
            'message': self.message,
            'productId': self.product_id,
            'userId': self.user_id,
            'username': user.username,
            'userProfileImage': user.profile_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
