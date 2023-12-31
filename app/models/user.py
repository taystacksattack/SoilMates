from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .vote import  Vote



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), default="https://soilmates.s3.amazonaws.com/default_quilt.jpg")


    #relationship
    # how we did it on everynote
    posts = db.relationship("Post", back_populates="owner", cascade="all, delete-orphan")
    soils = db.relationship("Soil", back_populates="owner", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="owner", cascade="all, delete-orphan")

    comment_votes = db.relationship("Comment", secondary=Vote, back_populates="user_votes")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image
        }
