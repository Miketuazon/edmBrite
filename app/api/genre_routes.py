from flask import Blueprint, jsonify, session, request
from app.models import User, db, Event
from .auth_routes import validation_errors_to_error_messages
from app.forms import GenreForm
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

@genre_routes.route('/create', methods=['GET','POST'])
@login_required
def create_genre():
    form = GenreForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_genre = Genre(
            name=form.data['name'],
            userId=current_user_dict['id'],
        )
        db.session.add(new_genre)
        db.session.commit()
        return  {'message': 'Successfully created genre', 'genre': new_genre.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@genre_routes.route('/<int:genre_id>', methods=['GET','PUT'])
@login_required
def update_genre(genre_id):
    form = GenreForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    genre = Genre.query.get(genre_id)
    if not genre:
        return {'error': 'Genre not found!'}, 404

    if current_user_dict['id'] != genre.userId:
        return {'error': 'You are not the owner of this genre. You cannot update it.'}, 403

    genre.name=form.data['name']
    genre.userId=current_user_dict['id']
    db.session.commit()
    return  {'message': 'Successfully updated genre', 'genre': genre.to_dict()}

@genre_routes.route('/<int:genre_id>', methods=['DELETE'])
@login_required
def delete_genre(genre_id):
    current_user_dict = current_user.to_dict()
    genre = Genre.query.get(genre_id)

    if not genre:
        return {'error': 'Genre not found!'}, 404

    if current_user_dict['id'] != genre.userId:
        return {'error': 'You are not the owner of this genre. You cannot delete it.'}, 403

    db.session.delete(genre)
    db.session.commit()

    return {'message': 'Genre deleted successfully'}
