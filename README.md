# Vagabond Connect 🌎
A Full-Stack social media website created using React, TypeScript, NodeJS, and MongoDB.
View the live demo here: [https://vagabondconnect.netlify.app/](https://vagabondconnect.netlify.app/)

## Table of Contents
* [General Info](#general-info)
* [Screenshot](#screenshot)
* [Features](#features)
* [Usage](#usage)
* [Technologies](#technologies)
* [Challenges](#challenges)
* [What I Learned](#what-i-learned)


## General Info
This is a Full-Stack Social Media website created from the ground up using React, TypeScript, Redux, and MUI for the frontend, NodeJS, Express, and Socket.io for the backend, and MongoDB and Cloudinary for the database. 

Users can utilize this website either as a gurst or a logged-in user.
As a guest certains actions are disbaled (creating posts, following people, and messaging).
Authenticated users can create & edit posts, comment on posts, follow other users, update their profile, and message other users.

## Screenshot
![ScreenShot](https://github.com/Leopoldov95/Vagabond-Connect/blob/MERN/vagabond_screenshot.png?raw=true)

## Features
* Fullstack Social Media website
* User authentication and permission management
* Users can message other users in realtime thanks to Socket.io
* Realtime notifications when a post os liked or a new message is received.
* Users can create, edit, and delete their account
* Users can create posts, upload images, like posts, comment on posts, delete their posts, and make edits to their posts
* Users have a profile page in which they can add a bio and personalize their profile pciture and background image
* Users can follow one another and keep track of the following count
* Posts can be sorted based on continent or followers
* Website is responsive and looks great on any screen size
* Frontend deployed on [Netlify](https://www.netlify.com/)
* Backend deployed on [Adaptable.io](https://adaptable.io/)

## Usage
Simply click on the demo link provided to view the demo link.
If you wish to download the code and use it, you must first download or clone the repo.
If you want to use your own MongoDb Atlas server, you must configure the .env file with your MongoDB database and then run ```npm install ``` to install the dependencies and then start the server with ```npm start ```

If you just want to use the client then simply go to the client folder, run ```npm install ``` to install the dependencies and then start the client with ```npm start ```

## Technologies
The app was created with the following technologies
Frontend:
* ReactJS
* Redux
* Typescript
* MaterialUI

Backend
* NodeJS
* Express
* Socket.io
* Typescript

Database & Other Services
* Mongo DB
* Cloudinary

## Challenges 
I wanted to create a web application that heavily used a backend compared to my previous projects. A social media website was an excellent choice in order to fully understand the fundamentals of HTTP requests, managing and updating values in a database, and knowing how to make a flow between the frontend and the backend.

In addition to the aforementioned goals, I used Typescript in this project which was an additional challenge, although far from perfect, I learned the values of having types in order to prevent unexpected behavior as well as provide better documentation for my code.

An amazing library I used for the frontend was MaterialUI, which is a popular React component library. It was a bit tricky to use at first, but once I got the hang of it as well as its features, I was able to really build beautiful components for my website.

Perhaps the biggest hurdle to overcome was the use of realtime cross-browser updates using Socket.io
Knowing when and how to use socket components was quite the challenge but proved to be rewarding as realtime updates like messages, typing, and notifications were implemented.
Additionally, I had to find a hosting option that allowed for the use of Websockets.

## What I Learned
This project was a major step-up from previous websites I have created. While I had dabbled in the backend, the use was fairly minimal. With this project I learned how to structure a full-stack applicaion and manage the backend code. I also gained an appreciation for state management tools such as Redux to avoid having too many states floating around.

## Future Enhancemants
As of now I have finished all the main functionality for this web application.
However there is always room for improvement and some enhancements I am looking to make in the future are:
* Improve TypeScript code
* Refactor
