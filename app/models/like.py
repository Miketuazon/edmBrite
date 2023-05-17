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

# student identifier
