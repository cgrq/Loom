import json
from app.models import db, Storefront, environment, SCHEMA
from sqlalchemy.sql import text


def seed_storefronts():
    f = open('seed_data/storefronts.json')
    storefronts = json.load(f)

    for u in storefronts:
        storefront = Storefront(
            name=u['name'],
            description=u['description'],
            banner_image=u['banner_image'],
            user_id=u['user_id'],
        )
        db.session.add(storefront)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the storefronts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_storefronts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.storefronts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM storefronts"))

    db.session.commit()
