from app.models import db, Comment, SCHEMA, environment
from sqlalchemy.sql import text

def seed_comments():

    comment_1 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [1,2,3],
        postId = 1,
        ownerId = 1
    )
    comment_2 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [4],
        postId = 2,
        ownerId = 9
    )
    comment_3 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [7,9,4,3],
        postId = 3,
        ownerId = 10
    )
    comment_4 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [9,7,1,6],
        postId = 4,
        ownerId = 3
    )
    comment_5 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [1,2,3,4,5],
        postId = 5,
        ownerId = 2
    )
    comment_6 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [3,8,5],
        postId = 5,
        ownerId = 2
    )
    comment_7 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [10,5,],
        postId = 2,
        ownerId = 6
    )
    comment_8 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [8],
        postId = 5,
        ownerId = 9
    )
    comment_9 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [4,5],
        postId = 9,
        ownerId = 8
    )
    comment_10 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [6,2],
        postId = 7,
        ownerId = 7
    )
    comment_11 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [9,3,6],
        postId = 10,
        ownerId = 7
    )
    comment_12 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [1,5],
        postId = 3,
        ownerId = 2
    )
    comment_13 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [1,7,4,5],
        postId = 8,
        ownerId = 1
    )
    comment_14 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [10],
        postId = 1,
        ownerId = 9
    )
    comment_15 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        votes= [3,5,10],
        postId = 7,
        ownerId = 6
    )


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.add(comment_15)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
