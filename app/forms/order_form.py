from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class OrderForm(FlaskForm):
    quantity = StringField('lastName', validators=[
                           DataRequired(), Length(1, 40)])
