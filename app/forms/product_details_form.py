from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, NumberRange, Length

class ProductDetailsForm(FlaskForm):
    name = StringField('name', validators=[
                            DataRequired(), Length(1, 255)])
    description = StringField('description', validators=[
                            DataRequired(), Length(1, 255)])
    quantity = IntegerField('quantity', validators=[
                            DataRequired(), NumberRange(min=0,max=9999)])
    price = FloatField('price', validators=[
                            DataRequired(), NumberRange(min=0,max=99999)])
    category = StringField('category', validators=[
                            DataRequired(), Length(1, 50)])
    subcategory = StringField('subcategory', validators=[
                            DataRequired(), Length(1, 150)])
    storefrontId = quantity = IntegerField('storefrontId', validators=[
                            DataRequired()])
