from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from ..models.db import db
from ..forms.post_form import PostForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def posts():
    '''
    Query for all posts and return them in a list of their dictionary form
    '''

    posts = Post.query.filter(Post.ownerId == current_user.id).all()

    return {"posts": [post.to_dict() for post in posts]}
