from .db import db, environment, SCHEMA, add_prefix_for_prod, backref
from datetime import datetime
from .share_privileges import share_privileges


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    body = db.Column(db.Text())
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.String, nullable=False, default=datetime.utcnow)

    # relationships
    owner = db.relationship("User", back_populates="posts")


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'ownerId': self.ownerId,
        }