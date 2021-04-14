# Social Network API ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  <p align="center">
    <img src="https://img.shields.io/badge/Javascript-yellow" />
    <img src="https://img.shields.io/badge/-Node.js-green" />
    <img src="https://img.shields.io/badge/-MongoDB-orange" />
    <img src="https://img.shields.io/badge/-Mongoose-purple" />
    <img src="https://img.shields.io/badge/Express-brightgreen" />
    <img src="https://img.shields.io/badge/-ScreenCastify-grey" />
  </p>

## Description
  This command-line application is the backend API of a social network site that uses MongoDb, a NoSQL database, so that the website can handle large amount of unstructured data.
  
  API GET, POST, PUT and DELETE routes were created for users and their thoughts. API POST and DELETE routes were also created for reations to comments and for friends of users. Data is displayed in JSON format.
  
  This project utilizes Node.js, the MongoDB database package, Mongoose package for models and Express package. The GET, POST, PUT and DELETE routes were illustrated in Insomnia Core.


## Installation
  Clone the repository to your terminal. Intall Node.js and MongoDB to your terminal. Install Mongoose, Sequelize and Express to the root of your project directory. To start the server to run the application, type npm start from the root of your directory. You can use Insomnia Core to run the Get, Post, Put and Delete methods on the data.

## Usage
  [Link to Social Network API  walk-through video](https://drive.google.com/file/d/1buCVRwGDz6m-R4o1z1zO3sq41ZahGIbW/view?usp=sharing) 

  #### API Routes
  - /api/users
    * GET all users
    * GET a single user by its _id and populated thought and friend data
    * POST a new user
    * PUT to update a user by its _id
    * DELETE to remove a user by its _id \(also removes a user's associated thoughts when deleted\)

  - /api/users/:userId/friends/:friendId
    * POST to add a new friend to a user's friend list
    * DELETE to remove a friend from a user's friend list

  - /api/thoughts
    * GET to get all thoughts
    * GET to get a single thought by its _id
    * POST to create a new thought and push the created thought's _id to the associated user's thoughts array
    * PUT to update a thought by its _id
    * DELETE to remove a thought by its _id

  - /api/thoughts/:thoughtId/reactions
    * POST to create a reaction stored in a single thought's reactions array
    * DELETE to pull and remove a reaction by the reaction's reactionId value

## License  
  
Licensed under the The MIT License (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

(https://opensource.org/licenses/MIT)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
  

    