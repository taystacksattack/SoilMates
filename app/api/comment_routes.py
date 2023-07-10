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


@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    if(current_user.id != comment_to_delete.ownerId):
        return {"error": "This is not your comment to delete!"}

    db.session.delete(comment_to_delete)
    db.session.commit()
    return {"status": "Sucessful deletion"}
