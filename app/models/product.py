from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(150), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    # Foreign Keys
    storefront_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("storefronts.id"), ondelete="CASCADE"), nullable=False)

    storefront = db.relationship('Storefront', back_populates="products")

    cart_items = db.relationship(
        "CartItem", back_populates="product", cascade="all, delete-orphan")

    reviews = db.relationship(
        "Review", back_populates="product", cascade="all, delete-orphan")

    product_images = db.relationship('ProductImages', uselist=False, back_populates='product')

    def to_dict(self):
        
            return {
                'id': self.id,
                'name': self.name,
                'description': self.description,
                'quantity': self.quantity,
                'price': self.price,
                'category': self.category,
                'subcategory': self.subcategory,
                'productImages': self.product_images.to_dict(),
                'storefrontId': self.storefront_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
            }
