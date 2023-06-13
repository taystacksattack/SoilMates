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
    print("current user id", current_user)
    posts = Post.query.filter(Post.ownerId == current_user.id).all()
    # posts = Post.query.all()
    print("posts", {"posts": [post.to_dict() for post in posts]})

    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/new')
@login_required
def new_post():
    '''
    Creates a new post and returns it as a dictionary
    '''

    form =PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            title=data['title'],
            body=data['body'],
            ownerId=data['ownerId']
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()

    return validation_errors_to_error_messages(form.errors)
