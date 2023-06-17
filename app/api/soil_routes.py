from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Soil
from ..models.db import db
from ..forms.soil_form import SoilForm
from datetime import datetime


soil_routes = Blueprint('soils', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@soil_routes.route('')
def soils():
    soils = Soil.query.filter(Soil.ownerId == current_user.id).all()
    soil_dicts = [soil.to_dict() for soil in soils]
    return soil_dicts


@soil_routes.route('/new', methods = ["GET", "POST"])
def new_soil():
    print('made it to the backend!')
    form = SoilForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_soil = Soil(
            ownerId=current_user.id,
            title=data['title'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            percent_sand=data['percent_sand'],
            percent_silt=data['percent_silt'],
            percent_clay=data['percent_clay'],
            cec=data['cec'],
            bdod=data['bdod'],
            nitrogen=data['nitrogen'],
            soc=data['soc'],
            phh2o=data['phh2o']
        )

        db.session.add(new_soil)
        db.session.commit()
        return new_soil.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@soil_routes.route('<int:id>/delete', methods=["DELETE"])
@login_required
def delete_soil(id):
    soil_to_delete = Soil.query.get(id)
    if(current_user.id != soil_to_delete.ownerId):
        return {"error": "This is not your soil to delete!"}

    db.session.delete(soil_to_delete)
    db.session.commit()
    return {"status": "Good job, you deleted the soil!"}
