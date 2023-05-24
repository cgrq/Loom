from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length
from app.models import Product

def product_exists(self, field):
        id_field = self.id.data
        submitted_name = field.data
        if id_field:
            product = Product.query.get(id_field)
            if product and product.name == submitted_name:
                return # Skip validation for edit requests if field has a value

        if Product.query.filter(Product.name == submitted_name).first():
            raise ValidationError('Name already exists.')

class ProductDetailsForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('name', validators=[
                            DataRequired(), Length(1, 255), product_exists])
    description = StringField('description', validators=[
                            DataRequired(), Length(1, 255)])
    quantity = IntegerField('quantity', validators=[
                            DataRequired(message="This field is required and must be a number"), NumberRange(min=0,max=9999)])
    price = FloatField('price', validators=[
                            DataRequired(message="This field is required and must be a number"), NumberRange(min=0,max=99999)])
    category = StringField('category', validators=[
                            DataRequired(), Length(1, 50)])
    subcategory = StringField('subcategory', validators=[
                            DataRequired(), Length(1, 150)])
    storefrontId = IntegerField('storefrontId', validators=[
                            DataRequired()])
