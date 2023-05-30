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
        print("Image1 Data from self")
        print(self.image1.data)
        return bool(self.image1.data) and self.image1.data != self.image1.default

    def is_image2_modified(self):
        return bool(self.image2.data) and self.image2.data != self.image2.default

    def is_image3_modified(self):
        return bool(self.image3.data) and self.image3.data != self.image3.default

    def is_image4_modified(self):
        return bool(self.image4.data) and self.image4.data != self.image4.default

    def is_image5_modified(self):
        return bool(self.image5.data) and self.image5.data != self.image5.default

    def is_image6_modified(self):
        return bool(self.image6.data) and self.image6.data != self.image6.default
