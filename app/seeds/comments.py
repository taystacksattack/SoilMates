from app.models import db, Comment, User, SCHEMA, environment
from sqlalchemy.sql import text


def seed_comments():
    # gets all of the users
    users = User.query.all()

    # note that on the

    comment_1 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1], users[2], users[3]],
        postId = 1,
        ownerId = 1
    )
    comment_2 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3]],
        postId = 2,
        ownerId = 9
    )
    comment_3 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[7],users[9],users[4],users[0]],
        postId = 3,
        ownerId = 10
    )
    comment_4 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[7],users[1],users[6]],
        postId = 4,
        ownerId = 3
    )
    comment_5 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[2],users[3],users[4],users[5]],
        postId = 5,
        ownerId = 2
    )
    comment_6 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[8],users[5]],
        postId = 5,
        ownerId = 2
    )
    comment_7 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[5]],
        postId = 2,
        ownerId = 6
    )
    comment_8 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[8]],
        postId = 5,
        ownerId = 9
    )
    comment_9 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[4],users[5]],
        postId = 9,
        ownerId = 8
    )
    comment_10 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[6],users[2]],
        postId = 7,
        ownerId = 7
    )
    comment_11 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[3],users[6]],
        postId = 10,
        ownerId = 7
    )
    comment_12 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[5]],
        postId = 3,
        ownerId = 2
    )
    comment_13 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[7],users[4],users[5]],
        postId = 8,
        ownerId = 1
    )
    comment_14 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0]],
        postId = 1,
        ownerId = 9
    )
    comment_15 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[5],users[0]],
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
