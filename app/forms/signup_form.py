from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
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

def valid_image(form, field):
        profileImage = field.data

        if profileImage:
            if not profileImage.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                raise ValidationError('Only JPG, JPEG, PNG, and GIF images are allowed.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[
                            DataRequired(), Length(1, 40)])  # added this
    lastName = StringField('lastName', validators=[
                           DataRequired(), Length(1, 40)])  # added this
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(3, 20)])

    email = StringField('email', validators=[
                        DataRequired(), user_exists, valid_email, Length(1, 50)])

    profileImage = StringField('profileImage', validators=[valid_image, Length(1, 500)])  # added this
    password = StringField('password', validators=[DataRequired(), Length(1, 50)])
