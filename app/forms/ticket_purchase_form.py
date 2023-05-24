from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, InputRequired
from datetime import *

class Ticket_Purchase_Form(FlaskForm):
    ticket_type = StringField('ticket_type', validators=[DataRequired()])
    ticket_price = IntegerField('ticket_price', validators=[InputRequired(message="Please do not put cents. 100.00 not allowed but 100 is.")])
    ticket_quantity = IntegerField('ticket_quantity', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    confirmEmail = StringField('confirmEmail', validators=[DataRequired()])
    cardNumber = IntegerField('cardNumber', validators=[DataRequired()])
    expirationDate = IntegerField('expirationDate', validators=[DataRequired()])
    securityCode = IntegerField('securityCode', validators=[DataRequired()])
    zipCode = IntegerField('zipCode', validators=[DataRequired()])
