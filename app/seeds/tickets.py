from app.models import db, environment, SCHEMA, Ticket
from sqlalchemy.sql import text
import datetime
from random import sample

def seed_tickets():
    Ga1 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=30,
        event_id=2,
        user_id_ticket_creator=1,
    )

    Ga2 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=20,
        event_id=3,
        user_id_ticket_creator=2,
    )

    Ga3 = Ticket(
        ticket_type="General1",
        ticket_price=50,
        ticket_quantity=50,
        event_id=1,
        user_id_ticket_creator=3,
    )


    db.session.add(Ga1)
    db.session.add(Ga2)
    db.session.add(Ga3)
    db.session.commit()


def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))


    db.session.commit()
