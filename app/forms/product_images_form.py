from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,  Length
from app.api.aws_helper_routes import ALLOWED_EXTENSIONS

class ProductImagesForm(FlaskForm):
    image1 = FileField("Image1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField("Image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField("Image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image4 = FileField("Image4", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image5 = FileField("Image5", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image6 = FileField("Image6", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

    productId = IntegerField('productId', validators=[DataRequired()])

    def is_image1_modified(self):
        return self.image1.data and self.image1.data != self.image1.default
