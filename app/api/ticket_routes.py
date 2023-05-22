from flask import Blueprint, jsonify, session, request
from app.models import User, db, Event
from .auth_routes import validation_errors_to_error_messages
from app.forms import TicketForm
from flask_login import current_user, login_required
from datetime import date
from app.models import Ticket
# import os
# import requests
# import random

ticket_routes = Blueprint('tickets', __name__)

@ticket_routes.route('/events/<int:event_id>')
@login_required
def get_tickets_for_event(event_id):
    """
    Query to get tickets for single event
    """

    current_user = current_user.to_dict()
    event = Event.query.get(event_id)
    if not event:
        return {'error': 'Event not found'}, 404

    return {'message': 'Tickets for this event coming soon!'}


@ticket_routes.route('events/<int:event_id>', methods=['GET','POST'])
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
        db.session.add(new_ticket)
        db.session.commit()
        return {'message': 'Successfully created tickets for event', 'ticket': new_ticket.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
