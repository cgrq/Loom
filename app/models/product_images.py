from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import Product

class ProductImages(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    image1 = db.Column(db.String(500),nullable=False)
    image2 = db.Column(db.String(500))
    image3 = db.Column(db.String(500))
    image4 = db.Column(db.String(500))
    image5 = db.Column(db.String(500))
    image6 = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    # Foreign Keys
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id"), ondelete="CASCADE"), primary_key=True, unique=True)

    product = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            "image1": self.image1,
            "image2": self.image2,
            "image3": self.image3,
            "image4": self.image4,
            "image5": self.image5,
            "image6": self.image6,
            "product_id": self.product_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
