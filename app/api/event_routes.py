from flask import Blueprint, jsonify, session, request
from app.models import User, db, Event
from .auth_routes import validation_errors_to_error_messages
from app.forms import EventForm
from flask_login import current_user, login_required
from datetime import date
from app.models import Event, Ticket
import os
import requests
import random

event_routes = Blueprint('events', __name__)

@event_routes.route('')
def get_all_events():
    """
    Query for all edmtrain events and db created events, then
    returns them in a list of event dictionaries
    """
    # Getting api key and url. Make res. Return res and jsonify it.
    # api_key = os.getenv('EDMTRAIN_KEY')
    # url = f"https://edmtrain.com/api/events?client={api_key}"
    # edmtrain_response = requests.get(url)
    # data_from_edmtrain = edmtrain_response.json()['data']

    # random_events_10 = random.sample(data_from_edmtrain, k=10)
    # for event in data_from_edmtrain:
        # print(event)

    #  Getting all events
    events = Event.query.all()
    return_list = []
    for event in events:
        event_dict = event.to_dict()
        return_list.append(event_dict)

    data = {
        'db_data': return_list,
        # 'edmtrain_events': random_events_10,
    }
    return data


@event_routes.route('/current_user')
@login_required
def current_user_events():
    """
    Query for all user's events and returns them in a list of post dictionaries
    """

    current_user_dict = current_user.to_dict()
    events = Event.query.filter(Event.event_organizer_id == current_user_dict['id'])
    return_list = []
    for event in events:
        event_dict = event.to_dict()
        return_list.append(event_dict)

    if not len(return_list):
        return {'message': 'You currently have no events!'}
    return return_list


@event_routes.route('/<int:event_id>', methods=['GET'])
def get_event_detail(event_id):
    """
    Query for getting an event's detail and returns it in a dictionary
    """

    event = Event.query.get(event_id)
    if not event:
        return {'error': 'Event not found'}, 404

    return {'event': event.to_dict()}


@event_routes.route('/create', methods=['GET','POST'])
@login_required
def create_an_event():
    """
    Query for creating an event and returns it in a dictionary
    """

    form = EventForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_event = Event(
            event_name=form.data['event_name'],
            event_summary=form.data['event_summary'],
            event_description=form.data['event_description'],
            event_preview_image=form.data['event_preview_image'],
            event_description_image=form.data['event_description_image'],
            event_start_date=form.data['event_start_date'],
            event_end_date=form.data['event_end_date'],
            event_venue=form.data['event_venue'],
            event_street_address=form.data['event_street_address'],
            event_city=form.data['event_city'],
            event_state=form.data['event_state'],
            event_zip_code=form.data['event_zip_code'],
            event_organizer_id=current_user_dict['id'],
            event_genre_id=form.data['event_genre_id'],
            event_dj=form.data['event_dj'],
        )
        db.session.add(new_event)
        db.session.commit()
        return  {'message': 'Successfully created event', 'event': new_event.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/<int:event_id>', methods=['GET','PUT'])
@login_required
def update_event(event_id):
    """
    Query to update an event
    """

    form = EventForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not event_id:
        return {'error': 'Event ID is required for updating an event!'}, 400

    event = Event.query.get(event_id)
    if not event:
        return {'error': 'Event is not found!'}, 404

    if current_user_dict['id'] != event.event_organizer_id:
        return {'error': 'You are not the owner of this event. You cannot update it.'}, 403
    event.event_name = form.data['event_name']
    event.event_dj = form.data['event_dj']
    event.event_summary = form.data['event_summary']
    event.event_description = form.data['event_description']
    event.event_start_date = form.data['event_start_date']
    event.event_end_date = form.data['event_end_date']
    event.event_venue = form.data['event_venue']
    event.event_street_address = form.data['event_street_address']
    event.event_city = form.data['event_city']
    event.event_state = form.data['event_state']
    event.event_zip_code = form.data['event_zip_code']
    event.event_genre_id = form.data['event_genre_id']
    db.session.commit()
    return {'message': 'You updated your event!', 'event': event.to_dict()}


@event_routes.route('/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    """
    Delete an event based on the event ID provided in the request
    """

    if not event_id:
        return {'error': 'Event ID is required for deleting an event'}, 400

    event = Event.query.get(event_id)
    linked_tickets = Ticket.query.filter_by(event_id=event_id).all()

    if not event:
        return {'error': 'Event not found'}, 404

    current_user_dict = current_user.to_dict()
    if current_user_dict['id'] != event.event_organizer_id:
        return {'error': 'Unauthorized to delete this event. You are not the owner!'}, 403

    for ticket in linked_tickets:
        db.session.delete(ticket)

    db.session.delete(event)
    db.session.commit()

    return {'message': 'Event deleted successfully'}
