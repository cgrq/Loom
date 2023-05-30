import json
from app.models import db, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    f = open('seed_data/product_images.json')
    product_images = json.load(f)

    for u in product_images:
        product_image = ProductImages(
            image1=u['image1'],
            product_id=u['product_id'],
        )
        db.session.add(product_image)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the product_images table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
