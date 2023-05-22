"""empty message

Revision ID: aa57ac61df92
Revises: 8bb71d716abf
Create Date: 2023-05-21 23:03:57.659814

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa57ac61df92'
down_revision = '8bb71d716abf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.drop_constraint('Unique ticket', type_='unique')
        batch_op.create_unique_constraint('uq_event_ticket_type', ['event_id', 'ticket_type'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.drop_constraint('uq_event_ticket_type', type_='unique')
        batch_op.create_unique_constraint('Unique ticket', ['ticket_type'])

    # ### end Alembic commands ###
