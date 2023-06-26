from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from datetime import *

class GenreForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=40, min=3, message="Name must be between 3 and 40 characters")])
