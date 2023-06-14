from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from ..models.db import db
from ..forms.post_form import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

# changed function from auth routes to work better with JS (need to jsonify data).
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@post_routes.route('')
# @login_required
def posts():
    '''
    Query for all posts and return them in a list of their dictionary form
    '''
    # print("current user id", current_user)
    posts = Post.query.filter(Post.ownerId == current_user.id).all()
    # posts = Post.query.all()
    # print("posts", {"posts": [post.to_dict() for post in posts]})

    return [post.to_dict() for post in posts]


@post_routes.route('/new', methods=["GET", "POST"])
@login_required
def new_post():
    '''
    Creates a new post and returns it as a dictionary
    '''
    # print('made it to the backend!"')
    form =PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            title=data['title'],
            body=data['body'],
            ownerId=current_user.id
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_post(id):
    '''
    Creates a new post and returns it as a dictionary
    '''
    form =PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        post_to_update = Post.query.get(id)
        if(current_user.id != post_to_update.ownerId):
            return {"error": "This is not your post to update!"}

        data = form.data
        post_to_update.title = data['title']
        post_to_update.body = data['body']
        post_to_update.updated_at = datetime.utcnow()


        # db.session.add(post_to_update)
        db.session.commit()


        return post_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
