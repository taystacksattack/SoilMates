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

    comment_16 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1], users[2], users[3]],
        postId = 11,
        ownerId = 1
    )
    comment_17 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3]],
        postId = 12,
        ownerId = 9
    )
    comment_18 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[7],users[9],users[4],users[0]],
        postId = 13,
        ownerId = 10
    )
    comment_19 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[7],users[1],users[6]],
        postId = 14,
        ownerId = 3
    )
    comment_20 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[2],users[3],users[4],users[5]],
        postId = 15,
        ownerId = 2
    )
    comment_21 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[8],users[5]],
        postId = 15,
        ownerId = 2
    )
    comment_22 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[5]],
        postId = 12,
        ownerId = 6
    )
    comment_23 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[8]],
        postId = 15,
        ownerId = 9
    )
    comment_24 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[4],users[5]],
        postId = 19,
        ownerId = 8
    )
    comment_25 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[6],users[2]],
        postId = 17,
        ownerId = 7
    )
    comment_26 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[3],users[6]],
        postId = 110,
        ownerId = 7
    )
    comment_27 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[5]],
        postId = 13,
        ownerId = 2
    )
    comment_28 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[7],users[4],users[5]],
        postId = 18,
        ownerId = 1
    )
    comment_29 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0]],
        postId = 11,
        ownerId = 9
    )
    comment_30 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[5],users[0]],
        postId = 17,
        ownerId = 6
    )

    comment_31 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1], users[2], users[3]],
        postId = 21,
        ownerId = 1
    )
    comment_32 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3]],
        postId = 22,
        ownerId = 9
    )
    comment_33 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[7],users[9],users[4],users[0]],
        postId = 23,
        ownerId = 10
    )
    comment_34 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[7],users[1],users[6]],
        postId = 24,
        ownerId = 3
    )
    comment_35 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[2],users[3],users[4],users[5]],
        postId = 25,
        ownerId = 2
    )
    comment_36 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[8],users[5]],
        postId = 25,
        ownerId = 2
    )
    comment_37 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0],users[5]],
        postId = 22,
        ownerId = 6
    )
    comment_38 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[8]],
        postId = 25,
        ownerId = 9
    )
    comment_39 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[4],users[5]],
        postId = 29,
        ownerId = 8
    )
    comment_40 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[6],users[2]],
        postId = 27,
        ownerId = 7
    )
    comment_41 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[9],users[3],users[6]],
        postId = 210,
        ownerId = 7
    )
    comment_42 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[5]],
        postId = 23,
        ownerId = 2
    )
    comment_43 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[1],users[7],users[4],users[5]],
        postId = 28,
        ownerId = 1
    )
    comment_44 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[0]],
        postId = 21,
        ownerId = 9
    )
    comment_45 = Comment(
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in.",
        user_votes= [users[3],users[5],users[0]],
        postId = 27,
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
    db.session.add(comment_16)
    db.session.add(comment_17)
    db.session.add(comment_18)
    db.session.add(comment_19)
    db.session.add(comment_20)
    db.session.add(comment_21)
    db.session.add(comment_22)
    db.session.add(comment_23)
    db.session.add(comment_24)
    db.session.add(comment_25)
    db.session.add(comment_26)
    db.session.add(comment_27)
    db.session.add(comment_28)
    db.session.add(comment_29)
    db.session.add(comment_30)
    db.session.add(comment_31)
    db.session.add(comment_32)
    db.session.add(comment_33)
    db.session.add(comment_34)
    db.session.add(comment_35)
    db.session.add(comment_36)
    db.session.add(comment_37)
    db.session.add(comment_38)
    db.session.add(comment_39)
    db.session.add(comment_40)
    db.session.add(comment_41)
    db.session.add(comment_42)
    db.session.add(comment_43)
    db.session.add(comment_44)
    db.session.add(comment_45)
    db.session.commit()


#helper function removes join table votes - without this, votes remains, and when you try to re-seed, it violates the unique key contraint


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;"
            f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        db.session.execute(text("DELETE FROM votes"))


    db.session.commit()
