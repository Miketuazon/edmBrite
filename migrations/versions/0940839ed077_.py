"""empty message

Revision ID: 0940839ed077
Revises:
Create Date: 2023-06-29 17:46:33.268057

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '0940839ed077'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE genres SET SCHEMA {SCHEMA};")

    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_name', sa.String(length=50), nullable=False),
    sa.Column('event_dj', sa.String(length=100), nullable=False),
    sa.Column('event_summary', sa.String(length=140), nullable=False),
    sa.Column('event_preview_image', sa.String(), nullable=True),
    sa.Column('event_description_image', sa.String(), nullable=True),
    sa.Column('event_description', sa.String(), nullable=False),
    sa.Column('event_start_date', sa.String(), nullable=True),
    sa.Column('event_end_date', sa.String(), nullable=True),
    sa.Column('event_venue', sa.String(length=100), nullable=False),
    sa.Column('event_street_address', sa.String(length=100), nullable=False),
    sa.Column('event_city', sa.String(length=100), nullable=False),
    sa.Column('event_state', sa.String(length=20), nullable=False),
    sa.Column('event_zip_code', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.Column('event_organizer_id', sa.Integer(), nullable=False),
    sa.Column('event_genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_genre_id'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['event_organizer_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE events SET SCHEMA {SCHEMA};")

    op.create_table('likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'event_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE likes SET SCHEMA {SCHEMA};")

    op.create_table('tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_type', sa.String(), nullable=False),
    sa.Column('ticket_price', sa.Integer(), nullable=False),
    sa.Column('ticket_quantity', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('confirmEmail', sa.String(), nullable=True),
    sa.Column('cardNumber', sa.String(), nullable=True),
    sa.Column('expirationDate', sa.String(), nullable=True),
    sa.Column('securityCode', sa.String(), nullable=True),
    sa.Column('zipCode', sa.String(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id_ticket_creator', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id_ticket_creator'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tickets SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tickets')
    op.drop_table('likes')
    op.drop_table('events')
    op.drop_table('genres')
    op.drop_table('users')
    # ### end Alembic commands ###
