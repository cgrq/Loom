from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
from app.api.aws_helper_routes import ALLOWED_EXTENSIONS
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def valid_email(form, field):
    email = field.data
    valid_email = re.match(r"[A-Za-z0-9!_-]*@[A-Za-z0-9!_-]*\.[\w]*", email)
    if not valid_email:
        raise ValidationError('Please provide a valid email address.')




class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[
                            DataRequired(), Length(1, 40)])
    lastName = StringField('lastName', validators=[
                           DataRequired(), Length(1, 40)]) 
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(3, 20)])

    email = StringField('email', validators=[
                        DataRequired(), user_exists, valid_email, Length(1, 50)])

    profileImage = FileField("profileImage", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    password = StringField('password', validators=[DataRequired(), Length(1, 50)])
