from .db import db, environment, SCHEMA, add_prefix_for_prod

# Many to many linking table between users and events
likes = db.Table(
    "likes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "event_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("events.id")),
        primary_key=True
    )
)

# Remember these 2 lines for production
if environment == "production":
    likes.schema = SCHEMA

# def add_liked_event(user_id, event_id):
#   """Adds a liked event to a user."""

#   # Get the user and event.
#   user = db.session.query(User).filter(User.id == user_id).first()
#   event = db.session.query(Event).filter(Event.id == event_id).first()

#   # Add the liked event to the user.
#   like = likes(user_id=user.id, event_id=event.id)
#   db.session.add(like)

#   # Commit the changes to the database.
#   db.session.commit()

#   return like
