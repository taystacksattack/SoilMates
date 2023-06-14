from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text(), nullable=False)
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
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
