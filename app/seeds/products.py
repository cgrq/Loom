import json
from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    f = open('seed_data/products.json')
    products = json.load(f)

    for u in products:
        product = Product(
            name=u['name'],
            description=u['description'],
            quantity=u['quantity'],
            price=u['price'],
            category=u['category'],
            subcategory=u['subcategory'],
            storefront_id=u['storefront_id'],
        )
        db.session.add(product)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
