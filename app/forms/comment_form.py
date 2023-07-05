from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField, DateField)
from wtforms.validators import DataRequired, Length


# def title_length(form, field):
#     if len(field.data) > 50 or len(field.data) < 5:
#         raise ValidationError('Field must be between 5 and 50 characters')

# def body_length(form, field):
#     if len(field.data) > 2000 or len(field.data) < 5:
#         raise ValidationError('Field must be between 5 and 2000 characters')


class CommentForm(FlaskForm):
    postId = IntegerField('postId')
    ownerId = IntegerField('ownerId')
    body = TextAreaField('Body', validators=[DataRequired()])
    created_at = DateField("Created at")
    updated_at = DateField("Updated at")
