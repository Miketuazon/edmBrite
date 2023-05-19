from flask import Blueprint, jsonify, session, request
from app.models import User, db, Event
from .auth_routes import validation_errors_to_error_messages
from app.forms import EventForm
from flask_login import current_user, login_required
from datetime import date
from app.models import Genre
import os
import requests
import random

genre_routes = Blueprint('genres', __name__)

@genre_routes.route('')
def get_genres():
    genres = Genre.query.all()
    return_list = []
    for genre in genres:
        genre_dict = genre.to_dict()
        return_list.append(genre_dict)

    return return_list
