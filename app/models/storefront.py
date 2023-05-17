from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Storefront(db.Model):
    __tablename__ = 'storefronts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(255), nullable=False)
    banner_image = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id"), ondelete="CASCADE"), unique=True, nullable=False, )

    user = db.relationship('User', back_populates="storefronts")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'banner_image': self.banner_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
