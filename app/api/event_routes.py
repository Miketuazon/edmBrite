from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def get_all_events():
    """
    Query for all events and returns them in a list of event dictionaries
    """
    events = Event.query.all()
    return_list = []
    for event in events:
        event_dict = event.to_dict()
        return_list.append(event_dict)

    breakpoint()
    return return_list
