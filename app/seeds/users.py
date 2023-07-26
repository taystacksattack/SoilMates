from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/default_quilt.jpg")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/marnie.png")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/bobbie.jpeg")
    ginnie = User(
        username='ginnie', email='ginnie@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/ginnie.png")
    ronjon = User(
        username='ronjon', email='ronjon@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/ron.png")
    weasel = User(
        username='weasel', email='weasel@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/weasel.webp")
    harry = User(
        username='harry', email='harry@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/harry.avif")
    hermione = User(
        username='hermione', email='hermione@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/Hermione.png")
    snape = User(
        username='snape', email='snape@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/snape.png")
    dumbledore = User(
        username='dumbledore', email='dumbledore@aa.io', password='password', image="https://soilmates.s3.amazonaws.com/dumbledore.jpeg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ginnie)
    db.session.add(ronjon)
    db.session.add(weasel)
    db.session.add(harry)
    db.session.add(hermione)
    db.session.add(snape)
    db.session.add(dumbledore)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
