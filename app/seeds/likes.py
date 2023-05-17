from app.models import db, environment, SCHEMA, likes
from sqlalchemy.sql import text
import datetime
from random import sample


def seed_likes():
    # like1 = like(
    #     user_id=1,
    #     event_id=2
    # )

    # like2 = like(
    #     user_id=2,
    #     event_id=3
    # )

    # like3 = like(
    #     user_id=3,
    #     event_id=1
    # )

    # db.session.add(like1)
    # db.session.add(like2)
    # db.session.add(like3)

    new_like = likes.insert().values(
        user_id = 1,
        event_id = 2
    )
    new_like2 = likes.insert().values(
        user_id = 2,
        event_id = 3
    )
    new_like3 = likes.insert().values(
        user_id = 3,
        event_id = 1
    )

    db.session.execute(new_like)
    db.session.execute(new_like2)
    db.session.execute(new_like3)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))


    db.session.commit()
