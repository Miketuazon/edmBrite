"""empty message

Revision ID: e26ad00138fb
Revises: b68129b1ed51
Create Date: 2023-05-23 16:58:04.418002

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e26ad00138fb'
down_revision = 'b68129b1ed51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.alter_column('event_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.alter_column('event_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###