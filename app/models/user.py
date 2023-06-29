from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Remember these 2 lines for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #Likes on events relationship
    event_likes = db.relationship(
        "Event",
        secondary=likes,
        back_populates="user_likes"
    )

    # One to Many
    events = db.relationship('Event', back_populates='owner')
    tickets_created = db.relationship('Ticket', back_populates='ticket_creator')
    genres_created = db.relationship('Genre', back_populates='genre_creator')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # function to return itself
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'events_liked': [event.id for event in self.event_likes],
            'events_owned': [event.id for event in self.events],
            'ticket_orders_owned': [tickets_created.id for tickets_created in self.tickets_created],
            'genres_created': [genres_created.id for genres_created in self.genres_created]
        }
