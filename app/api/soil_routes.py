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
