"""empty message

Revision ID: 8bbfa137f09e
Revises: e3c6ea72d0cb
Create Date: 2023-05-19 11:59:58.949794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8bbfa137f09e'
down_revision = 'e3c6ea72d0cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_venue', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('event_street_address', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('event_city', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('event_state', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('event_zip_code', sa.Integer(), nullable=False))
        batch_op.drop_column('event_location')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_location', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('event_zip_code')
        batch_op.drop_column('event_state')
        batch_op.drop_column('event_city')
        batch_op.drop_column('event_street_address')
        batch_op.drop_column('event_venue')

    # ### end Alembic commands ###