from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from .signup_form import valid_image

class StorefrontForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(), Length(1, 255)])
    bannerImage = StringField('bannerImage', validators=[valid_image, Length(1, 500)])
