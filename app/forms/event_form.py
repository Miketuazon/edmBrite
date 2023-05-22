from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Genre
from datetime import *

class EventForm(FlaskForm):
    event_name = StringField('event_name')
    event_dj = StringField('event_dj', validators=[DataRequired()])
    event_summary = StringField('event_summary', validators=[Length(max=140, min=3, message="Summary must be between 3 and 140 characters")])
    event_preview_image = StringField('event_preview_image', validators=[DataRequired()])
    event_description_image = StringField('event_description_image', validators=[DataRequired()])
    event_description = TextAreaField('event_description', validators=[Length(min=3, message="Event description must be at least 3 characters")])
    event_start_date = DateField('event_start_date', format='%m/%d/%Y %I:%M %p', validators=[DataRequired(message="Please provide MM/DD/YYYY HH:MM AM/PM format")])
    event_end_date = DateField('event_start_date', format='%m/%d/%Y %I:%M %p', default=event_start_date, validators=[DataRequired(message="Please provide MM/DD/YYYY HH:MM AM/PM format")])
    # event_location = StringField('event_description', validators=[Length(min=3, max=100, message="Location must be between 3 and 100 characters")])
    event_venue = StringField('event_venue', validators=[DataRequired()])
    event_street_address = StringField('event_street_address', validators=[DataRequired()])
    event_city = StringField('event_city', validators=[DataRequired()])
    event_state = StringField('event_state', validators=[DataRequired()])
    event_zip_code = IntegerField('event_zip_code', validators=[DataRequired()])
    event_genre_id = SelectField('event_genre_id', validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # breakpoint()
        self.event_genre_id.choices = [genre.id for genre in Genre.query.all()]

    def validate_event_end_date(self, event_end_date):
        if event_end_date.data < self.event_start_date.data:
            raise ValidationError('Event end date cannot be earlier than the start date.')
