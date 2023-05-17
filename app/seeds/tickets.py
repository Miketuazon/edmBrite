from app.models import db, environment, SCHEMA, Ticket
from sqlalchemy.sql import text
import datetime
from random import sample

def seed_tickets():
    Ga1 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=1,
        event_id=2,
        user_id=1,
    )

    Ga2 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=1,
        event_id=3,
        user_id=2,
    )

    Ga3 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=1,
        event_id=1,
        user_id=3,
    )

    Ga4 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=1,
        event_id=3,
        user_id=1,
    )

    db.session.add(Ga1)
    db.session.add(Ga2)
    db.session.add(Ga3)
    db.session.add(Ga4)
    db.session.commit()


def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))


    db.session.commit()
