from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class OrderForm(FlaskForm):
    status = StringField('status', validators=[
                           DataRequired(), Length(1, 40)])
