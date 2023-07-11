from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .vote import  Vote


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text(), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.String, nullable=False, default=datetime.utcnow)

    # relationships
    owner = db.relationship("User", back_populates="comments")
    posts= db.relationship("Post", back_populates="comments")

    user_votes = db.relationship("User", secondary=Vote, back_populates="comment_votes")


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'postId': self.postId,
            'ownerId': self.ownerId,
            'votes': [user.id for user in self.user_votes],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.owner.to_dict()
        }
