from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Event
from datetime import *

class TicketForm(FlaskForm):
    ticket_type = StringField('ticket_type', validators=[DataRequired()])
    ticket_price = IntegerField('ticket_price', validators=[DataRequired()])
    ticket_quantity = IntegerField('ticket_quantity', validators=[DataRequired()])
