from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from .signup_form import valid_email, valid_image

class EditUserForm(FlaskForm):
    firstName = StringField('firstName', validators=[
                            DataRequired(), Length(1, 40)])  # added this
    lastName = StringField('lastName', validators=[
                           DataRequired(), Length(1, 40)])  # added this
    username = StringField(
        'username', validators=[DataRequired(), Length(3, 20)])
    email = StringField('email', validators=[DataRequired(), valid_email, Length(1, 50)])
    profileImage = StringField('profileImage', validators=[valid_image, Length(1, 500)])  # added this
    password = StringField('password', validators=[DataRequired(), Length(1, 50)])
