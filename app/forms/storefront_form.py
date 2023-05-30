from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,  Length
from app.api.aws_helper_routes import ALLOWED_EXTENSIONS

class StorefrontForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(), Length(1, 255)])
    bannerImage = FileField("bannerImage", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
