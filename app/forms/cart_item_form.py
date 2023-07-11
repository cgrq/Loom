from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired(message="This field is required and must be a number")])
    productId = IntegerField('productId', validators=[DataRequired(message="This field is required and must be a number")])
    orderId = IntegerField('orderId', validators=[DataRequired(message="This field is required and must be a number")])
