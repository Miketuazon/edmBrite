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
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=1,
        user_id_ticket_creator=3,
    )
    Ga4 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=4,
        user_id_ticket_creator=2,
    )
    Ga5 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=5,
        user_id_ticket_creator=2,
    )
    Ga6 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=6,
        user_id_ticket_creator=3,
    )
    Ga7 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=7,
        user_id_ticket_creator=3,
    )
    Ga8 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=8,
        user_id_ticket_creator=1,
    )
    Ga9 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=9,
        user_id_ticket_creator=2,
    )
    Ga10 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=10,
        user_id_ticket_creator=3,
    )
    Ga11 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=11,
        user_id_ticket_creator=1,
    )
    Ga12 = Ticket(
        ticket_type="General",
        ticket_price=50,
        ticket_quantity=50,
        event_id=12,
        user_id_ticket_creator=1,
    )



    db.session.add(Ga1)
    db.session.add(Ga2)
    db.session.add(Ga3)
    db.session.add(Ga4)
    db.session.add(Ga5)
    db.session.add(Ga6)
    db.session.add(Ga7)
    db.session.add(Ga8)
    db.session.add(Ga9)
    db.session.add(Ga10)
    db.session.add(Ga11)
    db.session.add(Ga12)

    db.session.commit()


def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))


    db.session.commit()
