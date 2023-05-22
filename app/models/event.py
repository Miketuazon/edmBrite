from .db import db, environment, SCHEMA, add_prefix_for_prod
from .like import likes

class Event(db.Model):
    __tablename__ = 'events'

    # Remember these 2 lines for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(50), nullable=False)
    event_dj = db.Column(db.String(100), nullable=False)
    event_summary = db.Column(db.String(140), nullable=False)
    event_preview_image = db.Column(db.String())
    event_description_image = db.Column(db.String())
    event_description = db.Column(db.String(), nullable=False)
    event_start_date = db.Column(db.DateTime, default=db.func.now())
    event_end_date = db.Column(db.DateTime, default=db.func.now())
    event_venue = db.Column(db.String(100), nullable=False)
    event_street_address = db.Column(db.String(100), nullable=False)
    event_city = db.Column(db.String(100), nullable=False)
    event_state = db.Column(db.String(20), nullable=False)
    event_zip_code = db.Column(db.Integer(), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    # Foreign keys
    event_organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_genre_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), nullable=False)

    #User Like Event relationship
    user_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="event_likes"
    )
    #Many to one
    owner = db.relationship('User', back_populates='events')

    #One to many
    tickets_for_event = db.relationship('Ticket', back_populates='ticket_event')
    # function to return itself
    def to_dict(self):
        return {
            "id": self.id,
            "event_name": self.event_name,
            "event_dj": self.event_dj,
            "event_summary": self.event_summary,
            "event_preview_image": self.event_preview_image,
            "event_description_image": self.event_description_image,
            "event_description": self.event_description,
            "event_genre_id": self.event_genre_id,
            "event_start_date": self.event_start_date,
            "event_end_date": self.event_end_date,
            "event_venue": self.event_venue,
            "event_street_address": self.event_street_address,
            "event_city": self.event_city,
            "event_state": self.event_state,
            "event_zip_code": self.event_zip_code,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            'event_likes_count': [user.id for user in self.user_likes],
            'owner': self.owner.to_dict()
        }
