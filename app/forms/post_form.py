from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField)
from wtforms.validators import DataRequired, Length


def title_length(form, field):
    if len(field.data) > 50 or len(field.data) < 5:
        raise ValidationError('Field must be between 5 and 50 characters')

def body_length(form, field):
    if len(field.data) > 2000 or len(field.data) < 5:
        raise ValidationError('Field must be between 5 and 2000 characters')


class PostForm(FlaskForm):
    ownerId = IntegerField('ownerId')
    title = StringField('Title', validators=[DataRequired(), title_length])
    body = TextAreaField('Body', validators=[DataRequired(), body_length])
