from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,  Length
from .signup_form import valid_image

class ProductImagesForm(FlaskForm):
    image1 = StringField('image1', validators=[DataRequired(), valid_image, Length(1, 500)])
    image2 = StringField('image2', validators=[valid_image, Length(1, 500)])
    image3 = StringField('image3', validators=[valid_image, Length(1, 500)])
    image4 = StringField('image4', validators=[valid_image, Length(1, 500)])
    image5 = StringField('image5', validators=[valid_image, Length(1, 500)])
    image6 = StringField('image6', validators=[valid_image, Length(1, 500)])
    productId = IntegerField('productId', validators=[DataRequired()])
