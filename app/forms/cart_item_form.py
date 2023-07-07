from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    quantity = IntegerField('rating', validators=[DataRequired(message="This field is required and must be a number")])
