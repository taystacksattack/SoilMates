from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment
from ..models.db import db
from ..forms.comment_form import CommentForm
from datetime import datetime
# import operator

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('')
def comments():
    # straight up just grabs all of the comments
    comments = Comment.query.all()
    return [comment.to_dict() for comment in comments]
