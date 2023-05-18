from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event
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
    api_key = os.getenv('EDMTRAIN_KEY')
    url = f"https://edmtrain.com/api/events?client={api_key}"
    edmtrain_response = requests.get(url)
    data_from_edmtrain = edmtrain_response.json()['data']

    random_events_10 = random.sample(data_from_edmtrain, k=10)
    # for event in data_from_edmtrain:
        # print(event)

    #  Getting all events
    events = Event.query.all()
    return_list = []
    for event in events:
        event_dict = event.to_dict()
        return_list.append(event_dict)

    data = {
        'edmtrain_events': random_events_10,
        'db_data': return_list,
    }
    return data
