from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'

    # Remember these 2 lines for production
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticket_type = db.Column(db.String, nullable=False)
    ticket_price = db.Column(db.Float, nullable=False)
    ticket_quantity = db.Column(db.Integer, nullable=False)

    # Foreign keys
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    user_id_ticket_creator = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


    # Many to one
    ticket_event = db.relationship('Event', back_populates='tickets_for_event')
    ticket_creator = db.relationship('User', back_populates='tickets_created')

    def to_dict(self):
        return {
            "id": self.id,
            "ticket_type": self.ticket_type,
            "ticket_price": self.ticket_price,
            "ticket_quantity": self.ticket_quantity,
            "user_id_ticket_creator": self.user_id_ticket_creator,
            "event_id": self.event_id,
        }
