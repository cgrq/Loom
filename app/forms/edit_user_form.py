from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from .signup_form import valid_email
from app.api.aws_helper_routes import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    firstName = StringField('firstName', validators=[
                            DataRequired(), Length(1, 40)])
    lastName = StringField('lastName', validators=[
                           DataRequired(), Length(1, 40)])
    username = StringField(
        'username', validators=[DataRequired(), Length(3, 20)])
    email = StringField('email', validators=[DataRequired(), valid_email, Length(1, 50)])
    profileImage = FileField("profileImage", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    password = StringField('password', validators=[DataRequired(), Length(1, 50)])
