from flask.cli import AppGroup
from .users import seed_users, undo_users
from .storefronts import seed_storefronts, undo_storefronts
from .products import seed_products, undo_products
from .product_images import seed_product_images, undo_product_images
from .reviews import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_storefronts()
        undo_products()
        undo_product_images()
        undo_reviews()
    seed_users()
    seed_storefronts()
    seed_products()
    seed_product_images()
    seed_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_storefronts()
    undo_users()
    undo_products()
    undo_product_images()
    undo_reviews()
