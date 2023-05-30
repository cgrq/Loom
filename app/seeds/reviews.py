import json
from app.models import db, Review, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


def seed_reviews():
    f = open('seed_data/reviews.json')
    reviews = json.load(f)

    for u in reviews:
        # Convert the datetime strings to Python datetime objects
        created_at = datetime.strptime(u['created_at'], '%Y-%m-%dT%H:%M:%SZ')
        updated_at = datetime.strptime(u['updated_at'], '%Y-%m-%dT%H:%M:%SZ')

        review = Review(
            rating=u['rating'],
            message=u['message'],
            product_id=u['product_id'],
            user_id=u['user_id'],
            updated_at=updated_at,
            created_at=created_at,
        )
        db.session.add(review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the reviews table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
