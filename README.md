# Location-Based Trivia Game

This is a location-based trivia game built using Node.js, React, and TypeScript. The game allows players to answer trivia questions based on their current location.

## Features

  * Players can create and join game rooms.
  * The game fetches location-specific trivia questions.
  * Players can compete against each other to answer the questions correctly.
  * Real-time updates and notifications using Socket.IO.
  * Leaderboard to track player scores.
  * User authentication and authorization.
  * Google login

## Prerequisites

Before running the project, ensure you have the following installed:

    Node.js: JavaScript runtime environment
    MongoDB: NoSQL database

## Getting Started

    Clone the repository:

    bash

1 git clone https://github.com/your-username/location-based-trivia-game.git

2 Install dependencies:

shell

cd location-based-trivia-game
npm install
cd client
npm install

3 Set up environment variables:

    Create a .env file in the project root directory.
    Provide the necessary environment variables based on the .env.example file.

4 Start the server and client:

shell

    npm run dev

    This will start the Node.js server and the React client concurrently.

5 Access the application in your web browser:

    Open http://localhost:3000 to view the application.

