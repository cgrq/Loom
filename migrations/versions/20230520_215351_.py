"""empty message

Revision ID: d9b78bade50f
Revises: f132d95e400e
Create Date: 2023-05-20 21:53:51.956244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd9b78bade50f'
down_revision = 'f132d95e400e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('storefronts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=40), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('storefronts', schema=None) as batch_op:
        batch_op.drop_column('name')

    # ### end Alembic commands ###
