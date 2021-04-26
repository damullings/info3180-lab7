from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField
from wtforms.validators import InputRequired

class UploadForm(FlaskForm):
    description = StringField('description', validators=[InputRequired()])

    photo = FileField("Photo"
    ,validators=[
        FileRequired(),
        FileAllowed(["jpg","png"],"Images only!")
        ])
