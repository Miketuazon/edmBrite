from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event
import dotenv
import os
# Getting key from .env
dotenv.load_dotenv()

api_key = os.getenv('EDMTRAIN_KEY')
edmtrain_url = 'https/edmtrain.com/api'
