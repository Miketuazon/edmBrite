from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Genre
from datetime import *

class EventForm(FlaskForm):
    event_name = StringField('event_name')
    event_summary = StringField('event_summary', validators=[Length(max=140, min=3, message="Summary must be between 3 and 140 characters")])
    event_description = TextAreaField('event_description', validators=[Length(min=3, message="Event description must be at least 3 characters")])
    event_start_date = DateField('event_start_date', format='%m/%d/%Y', validators=[DataRequired(message="Please provide MM/DD/YYYY format")])
    event_end_date = DateField('event_start_date', format='%m/%d/%Y', default=event_start_date, validators=[DataRequired(message="Please provide MM/DD/YYYY format")])
    event_location = StringField('event_description', validators=[Length(min=3, max=100, message="Location must be between 3 and 100 characters")])
    event_genre_id = SelectField('event_genre_id', validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # breakpoint()
        self.event_genre_id.choices = [genre.id for genre in Genre.query.all()]

    def validate_event_end_date(self, event_end_date):
        if event_end_date.data < self.event_start_date.data:
            raise ValidationError('Event end date cannot be earlier than the start date.')
