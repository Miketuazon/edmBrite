from app.models import db, environment, SCHEMA, Event
from sqlalchemy.sql import text
import datetime
from random import sample
# import random

    # Will implement random later
# def random_date(start, end):
#     return start + datetime.timedelta(
#         seconds=random.randint(0, int((end - start).total_seconds()))
#     )

# start_date = datetime.datetime.now()
# end_date = random_date(start_date, )

# Creating datetime objects
date1 = datetime.datetime.strptime("6/10/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date1 = datetime.datetime.strptime("6/11/2023 02:00am", "%m/%d/%Y %I:%M%p")
date2 = datetime.datetime.strptime("7/15/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date2 = datetime.datetime.strptime("7/16/2023 02:00am", "%m/%d/%Y %I:%M%p")
date2 = datetime.datetime.strptime("5/31/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date3 = datetime.datetime.strptime("6/01/2023 02:00am", "%m/%d/%Y %I:%M%p")


def seed_events():
    event1 = Event(
        event_name="Porter Robinson",
        event_summary="Come for a fun time",
        event_description="This is Porter's return back to the Brooklyn Mirage! Get your tickets soon as this will sell out!",
        event_genre_id=1,
        event_start_date=date1,
        event_end_date =end_date1,
        event_location="Brooklyn Mirage",
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
        # user_likes=[2],
    )
    event2 = Event(
        event_name="Tchami x Malaa No Redemption",
        event_summary="Are you ready to dance?",
        event_description="The iconic duo are performing here live! Get your tickets soon as this will sell out!",
        event_genre_id=2,
        event_start_date=date2,
        event_end_date =end_date2,
        event_location="Echostage",
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
        # user_likes=[3],
    )
    event3 = Event(
        event_name="Wax Motif Live",
        event_summary="Are you ready to shake that?",
        event_description="Wax Motif is back to the heart of LA! Get your tickets soon as this will sell out!",
        event_genre_id=3,
        event_start_date=date2,
        event_end_date =end_date2,
        event_location="Academy",
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
        # user_likes=[1],
    )
    # event1.user_likes.append(1)
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))


    db.session.commit()
