from app.models import db, Soil, SCHEMA, environment
from sqlalchemy.sql import text

def seed_soils():

    soil_1 = Soil(
        ownerId = 1,
        title ="I am thinking about this soil to a funky beat",
        latitude = 37.719518,
        longitude = -122.433826,
        percent_sand = 43,
        percent_silt = 23,
        percent_clay = 34,
        cec = 150,
        bdod = 1.3,
        nitrogen = 66,
        soc = 56,
        phh2o =6.4
    )
    soil_2 = Soil(
        ownerId = 2,
        title ="This soil is beautiful, man, daggon'",
        latitude = 32.443658,
        longitude = -83.428626,
        percent_sand = 17,
        percent_silt = 48,
        percent_clay = 35,
        cec = 176,
        bdod = 1.1,
        nitrogen = 84,
        soc = 47,
        phh2o = 6.8
    )
    soil_3 = Soil(
        ownerId = 1,
        title ="Area near wood lot by stream",
        latitude = 40.719518,
        longitude = -177.138126,
        percent_sand = 27,
        percent_silt = 40,
        percent_clay = 33,
        cec = 189,
        bdod = 1.0,
        nitrogen = 33,
        soc = 22,
        phh2o =7.1
    )
    soil_4 = Soil(
        ownerId = 4,
        title ="test sample #33",
        latitude = 29.719518,
        longitude = -97.433826,
        percent_sand = 33,
        percent_silt = 27,
        percent_clay = 50,
        cec = 80,
        bdod = 1.9,
        nitrogen =32,
        soc = 27,
        phh2o =7.2
    )
    soil_5 = Soil(
        ownerId = 9,
        title ="soil at Tom's and Kathy's spot",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )
    soil_6 = Soil(
        ownerId = 8,
        title ="by the river",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )
    soil_7 = Soil(
        ownerId = 4,
        title ="flooded field sample",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )
    soil_8 = Soil(
        ownerId = 3,
        title ="folks' backyard",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )
    soil_9 = Soil(
        ownerId = 8,
        title ="by the railroad",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )
    soil_10 = Soil(
        ownerId = 8,
        title ="someplace else",
        latitude = 29.679518,
        longitude = -74.493826,
        percent_sand = 19,
        percent_silt = 50,
        percent_clay = 31,
        cec = 71,
        bdod = 0.6,
        nitrogen =32,
        soc = 66,
        phh2o =6.8
    )


    db.session.add(soil_1)
    db.session.add(soil_2)
    db.session.add(soil_3)
    db.session.add(soil_4)
    db.session.add(soil_5)
    db.session.add(soil_6)
    db.session.add(soil_7)
    db.session.add(soil_8)
    db.session.add(soil_9)
    db.session.add(soil_10)
    db.session.commit()


def undo_soils():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.soils RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM soils"))

    db.session.commit()
