from flask import Blueprint, jsonify, session, request
from app.models import User, db, Event
from .auth_routes import validation_errors_to_error_messages
from app.forms import Ticket_Purchase_Form, TicketForm
from flask_login import current_user, login_required
from datetime import date
from app.models import Ticket
from .event_routes import event_routes
# import os
# import requests
# import random

ticket_routes = Blueprint('tickets', __name__)

@event_routes.route('/<int:event_id>/tickets')
def get_tickets_for_event(event_id):
    """
    Query to get tickets for single event
    """

    event = Event.query.get(event_id)
    if not event:
        return {'error': 'Event not found'}, 404

    tickets_count = sum([ticket.ticket_quantity for ticket in event.tickets_for_event])
    all_tickets = [ticket for ticket in event.tickets_for_event]

    if not tickets_count:
        return {'message': 'Tickets for this event coming soon!'}
    # Get type, price and quantity to show
    # make a tickets object to store tickets
    tickets = {}
    total_tickets = 0
    # breakpoint() # each ticket in Ticket table
    for ticket in all_tickets:
        # breakpoint() # ticket object
        ticket_type = ticket.ticket_type
        ticket_price = ticket.ticket_price
        ticket_quantity = ticket.ticket_quantity

        # breakpoint() # ticket dictionary lookup
        if ticket_type not in tickets:
            tickets[ticket_type] = {}

        tickets[ticket_type]['ticket_price'] = ticket_price
        tickets[ticket_type]['ticket_quantity'] = ticket_quantity
        total_tickets += ticket_quantity

    return {
        "type": tickets,
        "total_tickets": total_tickets,
    }

@event_routes.route("/buy_tickets/<int:event_id>", methods=["POST"])
def buy_tickets(event_id):
    """
    Query to buy tickets for an event
    """

    current_user_dict = current_user.to_dict()
    event = Event.query.get(event_id)
    if not event_id:
        return {'error': 'Event not found'}, 404

    form = Ticket_Purchase_Form()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    bought_ticket = Ticket(
        ticket_type=form.data['ticket_type'],
        ticket_price=form.data['ticket_price'],
        ticket_quantity=form.data['ticket_quantity'],
        user_id_ticket_creator=current_user_dict['id'],
        event_id=event_id,
        first_name=form.data['first_name'],
        last_name=form.data['last_name'],
        email=form.data['email'],
        confirmEmail=form.data['confirmEmail'],
        cardNumber=form.data['cardNumber'],
        expirationDate=form.data['expirationDate'],
        securityCode=form.data['securityCode'],
        zipCode=form.data['zipCode'],
    )
    db.session.add(bought_ticket)
    db.session.commit()
    return {'message': 'Successfully bought tickets for event', 'ticket': bought_ticket.to_dict_bought()}
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@event_routes.route('/<int:event_id>/tickets/create', methods=['GET','POST'])
@login_required
def create_tickets_for_event(event_id):
    """
    Query to get create tickets for an owned event
    """

    current_user_dict = current_user.to_dict()
    event = Event.query.get(event_id)
    if not event_id:
        return {'error': 'Event not found'}, 404

    if current_user_dict['id'] != event.event_organizer_id:
        return {'error': 'You are not the owner of this event. You cannot update it.'}, 403

    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_ticket = Ticket(
            ticket_type=form.data['ticket_type'],
            ticket_price=form.data['ticket_price'],
            ticket_quantity=form.data['ticket_quantity'],
            user_id_ticket_creator=current_user_dict['id'],
            event_id=event_id,
        )
        if Ticket.query.filter_by(ticket_type=form.data['ticket_type'], event_id=event_id).first():
            return {'error': 'Ticket type already exists for this event'}, 400

        db.session.add(new_ticket)
        db.session.commit()
        return {'message': 'Successfully created tickets for event', 'ticket': new_ticket.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@event_routes.route("/<int:event_id>/tickets/<int:ticket_id>/update", methods=["PUT"])
@login_required
def update_ticket_price_or_quantity(ticket_id, event_id):
    """
    Query to update ticket price or quantity
    """

    form = TicketForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not ticket_id:
        return {'error': 'Ticket ID is required for updating a ticket!'}, 400

    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return {'error': 'Ticket not found!'}, 404

    if current_user_dict['id'] != ticket.user_id_ticket_creator:
        return {'error': 'You are not the creator of this ticket. You cannot update it.'}, 403

    ticket.ticket_type=form.data['ticket_type']
    ticket.ticket_price=form.data['ticket_price']
    ticket.ticket_quantity=form.data['ticket_quantity']
    ticket.user_id_ticket_creator=current_user_dict['id']
    ticket.event_id=event_id

    db.session.commit()
    return {'message': 'Successfully updated tickets for event', 'ticket': ticket.to_dict()}

@event_routes.route("/<int:event_id>/tickets/<int:ticket_id>/delete", methods=['DELETE'])
@login_required
def delete_ticket(ticket_id, event_id):
    """
    Delete an event based on the event ID provided in the request
    """

    if not ticket_id:
        return {'error': 'Ticket ID is required for updating a ticket!'}, 400

    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return {'error': 'Ticket not found!'}, 404

    current_user_dict = current_user.to_dict()
    if current_user_dict['id'] != ticket.user_id_ticket_creator:
        return {'error': 'You are not the creator of this ticket. You cannot update it.'}, 403

    db.session.delete(ticket)
    db.session.commit()

    return {'message': 'Ticket deleted successfully'}
