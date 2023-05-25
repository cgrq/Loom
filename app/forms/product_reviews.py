from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length

class ProductReviewsForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired(message="This field is required and must be a number"), NumberRange(min=1, max=5)] )
    message = StringField('message', validators=[DataRequired(), Length(1, 255)])
    productId = IntegerField('productId',validators=[DataRequired()])
    userId = IntegerField('userId',validators=[DataRequired()])
