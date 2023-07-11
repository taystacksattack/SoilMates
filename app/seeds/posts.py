from app.models import db, Post, SCHEMA, environment
from sqlalchemy.sql import text

def seed_posts():

    post_1 = Post(
        title="Having trouble planting blueberries in this part of my farm",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 1
    )
    post_2 = Post(
        title="Dicamba pesticide drift impacting chestnut crops",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 2
    )
    post_3 = Post(
        title="Soil amendments to limit fire blight",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 3
    )
    post_4 = Post(
        title="Paw paws not ripening properly",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 4
    )
    post_5 = Post(
        title="Which serviceberry varieties have the best flavor?",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 5
    )
    post_6 = Post(
        title="Is this a good spot for planting blueberries",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 5
    )
    post_7 = Post(
        title="Market prospects of honeyberries, 2024 and beyond",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 6
    )
    post_8 = Post(
        title="How to transition grassland into perennial crops",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 7
    )
    post_9 = Post(
        title="Best practices for zone 6b in the SE",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 8
    )
    post_10 = Post(
        title="Yield prospects for chestnuts 5-10 years after planting",
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nunc mi ipsum faucibus vitae aliquet. Eu mi bibendum neque egestas congue quisque egestas diam in. Tincidunt vitae semper quis lectus. Aliquam nulla facilisi cras fermentum odio. Cursus eget nunc scelerisque viverra. Duis tristique sollicitudin nibh sit. In dictum non consectetur a erat nam at lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Pellentesque nec nam aliquam sem et tortor. Blandit massa enim nec dui nunc mattis enim ut. Tellus elementum sagittis vitae et leo duis ut diam quam. Cursus euismod quis viverra nibh cras. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Eget egestas purus viverra accumsan in nisl. Porta nibh venenatis cras sed felis. Neque ornare aenean euismod elementum.",
        ownerId = 9
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)
    db.session.add(post_8)
    db.session.add(post_9)
    db.session.add(post_10)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
