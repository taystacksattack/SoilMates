from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from app.models import Comment
from ..models.db import db
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from datetime import datetime
# import operator

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

@post_routes.route('/feed')
# @login_required
def feed():
    '''
    Query for all posts and return them in a list of their dictionary form
    '''
    posts = Post.query.all()
    # print("posts", posts)
    post_dicts = [post.to_dict() for post in posts]
    # print(post_dicts)
    # sorted_posts = sorted(post_dicts, key=lambda post:post['title']) # doesn't work though....
    # print("sorted_dicts", sorted_posts)
    # posts = Post.query.all()
    # print("posts", {"posts": [post.to_dict() for post in posts]})

    return [post.to_dict() for post in posts]
    # return sorted_posts


@post_routes.route('')
# @login_required
def posts():
    '''
    Query for all posts and return them in a list of their dictionary form
    '''

    #note that the line below gets the one associated with the user.
    # posts = Post.query.filter(Post.ownerId == current_user.id).all()

    # please note, it is set up on front end to filter through the whole list which is coming from the feed.
    #THIS WILL BECOME A PROBLEM FOR WHEN WE HAVE TO IMPLEMENT INFINITE SCROLL OR PAGES
    # will need to restructure...
    posts = Post.query.all()
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


@post_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_post(id):
    post_to_delete = Post.query.get(id)
    if(current_user.id != post_to_delete.ownerId):
        return {"error": "This is not your post to delete!"}

    db.session.delete(post_to_delete)
    db.session.commit()
    return {"status": "Sucessful deletion"}


@post_routes.route('/<int:id>/comments')
def get_comments(id):
    # post = Post.query.get(id)
    # postObj = post.to_dict()
    comments = Comment.query.filter(Comment.postId==id).all()
    comment_dicts = [comment.to_dict() for comment in comments]
    # comments = Comment.query.all()
    print("HERE ARE THE COMMENTS",comment_dicts)
    # postObj["comments"]=commments
    return comment_dicts


@post_routes.route('/<int:id>/comment', methods=["GET", 'POST'])
def new_comment(id):
    form=CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data= form.data
        new_comment = Comment(
            postId = id,
            ownerId = current_user.id,
            body = data['body']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return
