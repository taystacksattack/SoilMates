from flask_wtf import FlaskForm
from wtforms import (FloatField, DateField, IntegerField)
from wtforms.validators import DataRequired


class SoilForm(FlaskForm):
    ownerId = IntegerField('ownerId')
    latitude = FloatField('Lat', validators=[DataRequired()])
    longitude = FloatField('Long', validators=[DataRequired()])
    percent_sand = FloatField('sand', validators=[DataRequired()])
    percent_silt = FloatField('silt', validators=[DataRequired()])
    percent_clay = FloatField('clay', validators=[DataRequired()])
    cec = FloatField('cec', validators=[DataRequired()])
    bdod = FloatField('bdod', validators=[DataRequired()])
    nitrogen = FloatField('nitrogen', validators=[DataRequired()])
    soc = FloatField('soc', validators=[DataRequired()])
    phh2o = FloatField('phh2o', validators=[DataRequired()])
    created_at= DateField("Created at")
