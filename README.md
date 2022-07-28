# Vagabond Connect 🌎

## Table of Contents
* [General Info](#general-info)
* [Screenshot](#screenshot)
* [Usage](#usage)
* [Features](#features)
* [Technologies](#technologies)
* [Challenges](#challenges)
* [What I Learned](#what-i-learned)


## General Info
This is a Full-Stack Social Media website where a user can have an account, create a post and manage it, follow and view other users, comment on posts, and personaliz their profile page. All information is stored in a Mongo database and the frontend was created using React and Typescript.

## Screenshot
![ScreenShot](https://github.com/Leopoldov95/Vagabond-Connect/blob/MERN/vagabond_screenshot.png?raw=true)

## Usage
Simply click on the demo link provided.
If you wish to download the code and use it, you must first download or clone the repo.
If you want to use your own MongoDb Atlas server, you must configure the .env file with your MongoDB database and then run ```npm install ``` to install the dependencies and then start the server with ```npm start ```

If you just want to use the client then simply go to the client folder, run ```npm install ``` to install the dependencies and then start the client with ```npm start ```

## Features
* Fullstack Social Media website
* Users can create, edit, and delete their account
* Users can create posts, upload images, like posts, comment on posts, delete their posts, and make edits to their posts
* Users have a profile page in which they can add a bio and personalize their profile pciture and background image
* Users can follow one another and keep track of the following count
* Posts can be sorted based on continent or followers
* Must have an account to create posts and follow users


## Technologies
The app was created with the following technologies
* ReactJS
* Redux
* Typescript
* MaterialUI
* NodeJS
* Express
* Mongo DB

## Challenges 
This is my second fullstack project I have created using the MERN stack.
This time I decided to add more backend knowlegde to handle creating, reading, and deleting booking information as well as notify the client if a room has been booked on their selected dates and is therefore no available to book.
I also wanted to use Redux to handle state change. As this was my first time implementing Redux it was quite the learning curve but in the end I was satisified with the resulsts and learned the value of using middlewares such as thunk.

## What I Learned
Using what I learned on my last MERN stack project, I decided to further advance my knowledge on the backend as well as implementing the state management tool called Redux into my website. I quickly found the value of using Redux as a state managemen tool as I no longer had to pass down a ton of props into child components, but rather simply calling it from the Redux store. I do admit that setting up the boiler plate was a bit of a challenge as well as understanding why I needed to use Redux middlewares such as thunk. I am glad though that I decided to utilize Redux from the start as I could see that trying to implement it into an existing project being a challenge.
I also learned alot more about the backend and using MongoDB as a databse. I decided to store all malleable data in the database as well as data such as booking details that can be created or deleted. One of the biggest challenges was handling date collisions. If a user searches for a room that has already been booked on a specified date, the user won't be able to boom that room. As a result I learned a lot about MongoDB objects and how to manipulate data on the backend in order to show that a room is unavaiable.
In the end I gained a great deal of knowledge and I'm looking forward to start creating larger and more ambituous projects.

