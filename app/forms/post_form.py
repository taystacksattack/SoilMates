from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField)

class PostForm(FlaskForm):
    ownerId = IntegerField('ownerId')
    title = StringField('Title')
    body = TextAreaField('Body')
