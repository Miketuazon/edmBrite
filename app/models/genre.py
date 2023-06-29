from .db import db, environment, SCHEMA, add_prefix_for_prod

class Genre(db.Model):
    __tablename__ = "genres"

    # Remember these 2 lines for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    #Foreign key for user
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)

    #Relationship for fkey user
    genre_creator = db.relationship('User', back_populates='genres_created')

    #Relationship to event
    # events_with_genre = db.relationship('Event', back_populates='genres')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_created': self.userId,
        }
