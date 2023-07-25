
# Thank you for checking out Soil Mates!

SoilMates, a play on "soul mates," allows users to collect soil data, make posts regarding their soil data and farming needs, and interact with the community by receiving recommendations - similar to Stack Overflow. Recommendations are upvoted by the community if the recommendation supports the farmer. Soil data requests are mediated using a map GUI to get a lat/lng coordinate, and an API fetch is made to the International Soil Research Information Center for soil data. 
Feel free to visit the live site [here](https://soilmates.onrender.com/)

## Index
* [MVP Feature List](https://github.com/taystacksattack/SoilMates/wiki/Features-List)
* [Database Schema](https://github.com/taystacksattack/SoilMates/wiki/Database-Schema)
* [User Stories](https://github.com/taystacksattack/SoilMates/wiki/User-Stories)
* [Wire Frames](https://github.com/taystacksattack/SoilMates/wiki/Wireframes)
* [Original Flask Starter Documentation](https://github.com/taystacksattack/EveryNote/wiki/Original-Flask-Starter-Documentation)

---------------------

## Techologies Used
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img
src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Sqlalchemy-000000?style=for-the-badge&logo=Sqlalchemy&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white" />

## Splash Page
![splash](https://github.com/taystacksattack/SoilMates/blob/trueMain/splashpage.png)

## Feed
![feed](https://github.com/taystacksattack/SoilMates/blob/trueMain/feed.png)

## Single Post
![notebooks](https://github.com/taystacksattack/SoilMates/blob/trueMain/singlepost.png)

## Soil Request
![tasks](https://github.com/taystacksattack/SoilMates/blob/trueMain/soilrequest.png)

## Getting Started

1. Start out by cloning the repository
2. Install the dependencies
    * `pipenv install -r requirements.txt`
3. Create .env file, for example:
     ```
     SECRET_KEY= super_secret_key_name
     DATABASE_URL=sqlite:///dev.db
     SCHEMA= schema_name_here
     ```
4. Make sure the SQLite3 database connection URL is in the **.env** file
5. In a terminal in the app directory,  set up into your pipenv, migrate your database, seed your database, and run your Flask app:

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
     * Essentially, in a terminal in the react-app folder:
         ```
           npm install
           npm start
         ```
7. Now you can either set up an account or use the demo user option to explore EveryNote

## Features List 

### 1. New account creation, log in, log out, and guest/demo login
  * Users can sign up, log in, and log out.
  * Users can use a demo login to try the site.
  * Users can't use certain features without logging in (like posting and commenting).
  * Logged in users are directed to their home feed where posts made by other users are shown.
  * Logged out users are directed to a splash page asking them to login again.

### 2. Soil Data
  * Logged in users can request soil data by inputting latitude and longitude.
  * Logged in users can store and view the data later.
  * Logged in users can post the data if they so choose.

### 3. Posts
  * Logged in users can submit posts with or without the soil data.
  * Logged in users can edit and delete their own posts.
  * Logged in users can view a main feed, or a feed of their posts.

##Future features:
### 1. Recommendations
  * Logged in users can view the recommendations on their post and the posts of their peers.
  * Logged in users can make recommendations on the posts to support the community with their expertise and input.
  * Logged in users can edit and delete their own recommendations, or if it is their post, they can delete recommendations.

### 2. Comments
  * Logged in users can view the comments on their recommendations and the recommendations of their peers.
  * Logged in users can make comments on the recommendations to respond to specific recommendations.
  * Logged in users can edit and delete their own comments, or if it is their own recommendation or post, they can delete the comment.

### 3. Votes
  * Logged in users can view the number of votes a recommendation has received.
  * Logged in users can upvote recommendations with which they agree.
  * Logged in users can make rescind their vote if they clicked on accident.

### 4. Search and AWS data
  * Logged in users can search through posts to find if their question has already been asked.
  * Logged in users can choose and avatar (data which will need to persist via AWS)


 
