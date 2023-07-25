from app.models import db, Post, SCHEMA, environment
from sqlalchemy.sql import text

def seed_posts():

    post_1 = Post(
        title="Need advice for improving soil drainage in my vegetable garden",
        body="I have a vegetable garden in the low-lying area of my farm, and it gets waterlogged every time it rains heavily. The excessive water is causing root rot and killing my plants. I've tried adding organic matter to improve soil structure, but it hasn't solved the issue completely. What other techniques or solutions can I try to enhance soil drainage and prevent waterlogging? Any advice is appreciated!",
        ownerId=1
    )
    post_2 = Post(
        title="Identifying nutrient deficiencies in my soybean crops",
        body="I'm a farmer growing soybeans in the Midwest, and I've noticed some abnormal yellowing and stunted growth in certain areas of my soybean field. I suspect it might be a nutrient deficiency, but I'm not sure which one. The field has had a history of soybean cultivation for the past five years. Can anyone help me identify the nutrient deficiency based on these symptoms, and what are the best practices for correcting it?",
        ownerId=2
    )
    post_3 = Post(
        title="Plant recommendations for a sunny patch of land in zone 9a",
        body="I have a sunny patch of land on the southern side of my property in zone 9a, and I'm looking to plant some trees or shrubs that can thrive in this hot and dry climate. The soil in that area is sandy with moderate drainage. I'd prefer low-maintenance plants that can tolerate drought conditions. Any recommendations or tips for choosing suitable plants for this specific plot?",
        ownerId=3
    )
    post_4 = Post(
        title="Dealing with invasive weeds in my pasture",
        body="I own a pasture that's been overrun with invasive weeds, particularly thistles and ragweed. They are outcompeting the native grasses and significantly reducing grazing areas for my livestock. I've tried mowing and hand-pulling, but it's getting out of control. Are there any effective herbicides or other strategies I can use to manage these invasive plants without harming the livestock and the environment?",
        ownerId=4
    )
    post_5 = Post(
        title="Tips for starting a no-till farming operation",
        body="I'm considering transitioning my farm to a no-till system to improve soil health and reduce erosion. However, I have always used conventional tillage methods, and I'm not sure how to get started with no-till farming. What equipment and practices do I need to adopt for a successful transition? Are there any potential challenges I should be aware of?",
        ownerId=5
    )
    post_6 = Post(
        title="Diagnosing and treating fungal diseases in tomato plants",
        body="My tomato plants are showing signs of wilting, yellow leaves, and black spots on the fruits. I suspect it might be a fungal disease, but I'm not sure which one. I rotate my crops annually and water the plants at the base to prevent overhead watering. Can anyone help me identify the specific fungal disease, and what fungicides or organic treatments should I use to save my tomato crop?",
        ownerId=5
    )
    post_7 = Post(
        title="Best cover crops for improving soil fertility in winter",
        body="I want to enhance the fertility of my fields during the winter season and prevent soil erosion. What are some suitable cover crops that I can grow during the winter months in zone 5? I'm specifically looking for cover crops that can fix nitrogen and add organic matter to the soil.",
        ownerId=6
    )
    post_8 = Post(
        title="Controlling soil erosion on sloped terrain",
        body="I have a piece of sloped land that's experiencing severe soil erosion during heavy rainfall. I'm concerned about the loss of fertile topsoil. What are the most effective methods to control soil erosion on sloped terrain? I'm also interested in long-term solutions to preserve soil health on this plot.",
        ownerId=7
    )
    post_9 = Post(
        title="Tips for conducting a soil test on my farm",
        body="I'm planning to conduct a comprehensive soil test on my farm to assess nutrient levels and pH. Can anyone guide me through the steps involved in soil sampling and testing? Are there any reputable laboratories that offer soil testing services? I'm located in the Southeastern region of the United States.",
        ownerId=8
    )
    post_10 = Post(
        title="Dealing with white grubs in my lawn",
        body="My lawn is infested with white grubs, and they are causing significant damage to the grass roots. I've noticed an increase in skunks and raccoons digging up the lawn to feed on the grubs. How can I effectively control the white grub population and restore the health of my lawn without harming beneficial insects?",
        ownerId=9
    )
    post_11 = Post(
        title="Companion planting for pest control",
        body="I'm interested in using companion planting techniques to naturally repel pests and reduce the need for chemical pesticides. Are there any specific plant combinations that work well together for pest control? I'm particularly concerned about pests that commonly affect tomatoes and cucumbers in my garden.",
        ownerId=5
    )
    post_12 = Post(
        title="Identifying soil compaction and its effects on crops",
        body="I suspect that my fields are experiencing soil compaction due to heavy machinery use during the harvest season. What are the signs of soil compaction, and how does it affect crop growth and yields? Additionally, what are the best methods to alleviate soil compaction and restore soil structure?",
        ownerId=9
    )
    post_13 = Post(
        title="Crop rotation recommendations for a small backyard garden",
        body="I have a small backyard vegetable garden, and I'm interested in implementing crop rotation to maintain soil fertility and reduce the risk of pests and diseases. What is the best crop rotation plan for a small space? Which crops should I rotate, and how often should I do it?",
        ownerId=2
    )
    post_14 = Post(
        title="Drought-resistant plants for a dry and sandy area",
        body="I live in a region with frequent droughts and have a sandy plot of land that doesn't retain water well. Can anyone recommend drought-resistant plants that can survive in such conditions? I'm looking for both ornamental plants and those suitable for xeriscaping.",
        ownerId=8
    )
    post_15 = Post(
        title="Tips for improving soil biodiversity in my orchard",
        body="I manage an orchard and want to promote soil biodiversity to support healthy fruit trees and improve overall ecosystem health. What are some practices or amendments I can use to enhance soil biodiversity? Are there specific cover crops or mulches that encourage beneficial soil organisms?",
        ownerId=1
    )
    post_16 = Post(
        title="Effective ways to manage soil salinity",
        body="My farm is facing issues with soil salinity, and it's affecting the growth of crops. I've tried leaching the soil and reducing irrigation, but the problem persists. What are some advanced methods to manage soil salinity and restore the productivity of the land?",
        ownerId=7
    )
    post_17 = Post(
        title="Understanding the benefits of biochar in soil",
        body="I've heard about the potential benefits of adding biochar to the soil, such as improved nutrient retention and carbon sequestration. How does biochar work, and what are the recommended application rates for different soil types? Has anyone experienced notable improvements in crop yields or soil health after using biochar?",
        ownerId=4
    )
    post_18 = Post(
        title="Tips for successful container gardening",
        body="I want to try container gardening on my balcony to grow herbs and vegetables. What types of containers should I use, and what are the essential factors to consider for successful container gardening, such as soil mix, watering frequency, and sunlight requirements?",
        ownerId=6
    )
    post_19 = Post(
        title="Methods for reducing soil compaction in a heavily used pasture",
        body="My pasture is used for rotational grazing, and the constant trampling of livestock has led to soil compaction. What are the most effective methods to reduce soil compaction in heavily grazed areas? I want to improve forage growth and soil health for the livestock.",
        ownerId=3
    )
    post_20 = Post(
        title="Identifying and controlling soil-borne diseases in my greenhouse",
        body="My greenhouse plants are showing signs of wilting, yellowing leaves, and stunted growth. I suspect it might be due to soil-borne diseases. What are some common soil-borne diseases that affect greenhouse crops, and how can I prevent or control them? Are there any disease-resistant plant varieties I should consider?",
        ownerId=9
    )
    post_21 = Post(
        title="Promoting earthworm activity for better soil aeration",
        body="I've heard that earthworms play a crucial role in soil aeration and nutrient cycling. How can I encourage earthworm populations in my garden or farm? Are there specific organic practices or soil amendments that attract and support earthworms?",
        ownerId=5
    )
    post_22 = Post(
        title="Advice for establishing a pollinator-friendly wildflower meadow",
        body="I want to convert a portion of my land into a wildflower meadow to attract pollinators and support local biodiversity. What are the steps involved in establishing a pollinator-friendly meadow, from site preparation to selecting the right wildflower mix?",
        ownerId=2
    )
    post_23 = Post(
        title="Determining the right time for cover crop termination",
        body="I'm using cover crops to improve soil health, but I'm unsure about the best time to terminate them before planting my main crops. How can I determine the right termination time for cover crops to maximize their benefits without competing with my cash crops?",
        ownerId=8
    )
    post_24 = Post(
        title="Advice for starting a community garden project",
        body="I want to initiate a community garden in my neighborhood to promote local food production and community engagement. What are the key steps and resources required to start a successful community garden project? Any tips on securing land and involving community members?",
        ownerId=1
    )
    post_25 = Post(
        title="Using compost tea as a soil amendment",
        body="I've been hearing about compost tea as a beneficial soil amendment. How do I make compost tea, and what are its advantages compared to regular compost application? Is it suitable for all types of plants and soils?",
        ownerId=7
    )
    post_26 = Post(
        title="Recommendations for mulching around fruit trees",
        body="I have a small orchard with fruit trees, and I want to mulch around them to conserve moisture and control weeds. What type of mulch is best for fruit trees, and how thick should the mulch layer be? Are there any considerations for avoiding trunk damage?",
        ownerId=4
    )
    post_27 = Post(
        title="Identifying and managing soil drainage issues in my backyard",
        body="My backyard has patches of standing water after rain, and some areas stay soggy for days. This is impacting the growth of grass and other plants. How can I identify and resolve the drainage issues in my backyard?",
        ownerId=6
    )
    post_28 = Post(
        title="Best practices for soil conservation in a vineyard",
        body="I run a vineyard and want to implement soil conservation practices to protect the soil from erosion and degradation. What are some best practices for soil conservation in vineyards, and how can I integrate cover crops and erosion control measures without affecting grape quality?",
        ownerId=3
    )
    post_29 = Post(
        title="Understanding the role of mycorrhizal fungi in soil health",
        body="I've heard that mycorrhizal fungi play an essential role in soil health and plant nutrition. What exactly are mycorrhizal fungi, and how do they benefit plants and the soil ecosystem? Can I encourage their growth naturally in my garden?",
        ownerId=9
    )
    post_30 = Post(
        title="Tips for setting up a rainwater harvesting system for irrigation",
        body="I want to collect rainwater for irrigation purposes to conserve water and reduce reliance on municipal supplies. What components do I need for a rainwater harvesting system, and how can I set it up effectively to meet my irrigation needs throughout the growing season?",
        ownerId=5
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
    db.session.add(post_11)
    db.session.add(post_12)
    db.session.add(post_13)
    db.session.add(post_14)
    db.session.add(post_15)
    db.session.add(post_16)
    db.session.add(post_17)
    db.session.add(post_18)
    db.session.add(post_19)
    db.session.add(post_20)
    db.session.add(post_21)
    db.session.add(post_22)
    db.session.add(post_23)
    db.session.add(post_24)
    db.session.add(post_25)
    db.session.add(post_26)
    db.session.add(post_27)
    db.session.add(post_28)
    db.session.add(post_29)
    db.session.add(post_30)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()

