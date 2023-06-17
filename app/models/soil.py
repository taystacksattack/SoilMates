from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Soil(db.Model):
    __tablename__ = 'soils'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    percent_sand = db.Column(db.Float, nullable=False)
    percent_silt = db.Column(db.Float, nullable=False)
    percent_clay = db.Column(db.Float, nullable=False)
    cec = db.Column(db.Float, nullable=False)
    bdod = db.Column(db.Float, nullable=False)
    nitrogen = db.Column(db.Float, nullable=False)
    soc = db.Column(db.Float, nullable=False)
    phh2o = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    owner = db.relationship("User", back_populates="soils")

    def to_dict(self):
        return{
            "id": self.id,
            "ownerId": self.ownerId,
            "title": self.title,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "percent_sand": self.percent_sand,
            "percent_silt": self.percent_silt,
            "percent_clay": self.percent_clay,
            "cec": self.cec,
            "bdod": self.bdod,
            "nitrogen": self.nitrogen,
            "soc": self.soc,
            "phh2o": self.phh2o,
            "created_at": self.created_at,
        }
