<div align="center">
  <img src="./public/banner.png" style="align:center">
</div>

# Fitnexp

## A fitness tracking and workout management web application

You are currently in the the repository for the frontend source code of Fitnexp.

Fitnexp is a web-based fitness application designed to help users track their workouts, exercises, and performance over time. Users can create custom workout routines, monitor progress with detailed charts and statistics, and manage their exercise history. The app aims to provide a personalized and data-driven fitness experience, allowing users to improve their training with insightful feedback.

## Key Features:

-   **User Authentication**: Users can register and log in with their own credentials.
-   **Exercise Library**: Users can browse through a comprehensive list of more than 870 exercises stored in the system and view detailed descriptions and instructions for each exercise.
-   **Workout Creation**: Users can build and customize workout routines, including adding exercises, setting repetitions, weights, and rest times.
-   **Performance Monitoring**: Detailed graphs and tables help users track their progress for individual exercises and overall workout performance.

## Installation Instructions

Before proceeding with the installation, make sure you meet the following prerequisites:

-   Node.js and its default package manager, npm, are installed.
-   You have an operational MongoDB server, either locally or remotely.
-   Git is installed and properly configured to clone repositories.
-   Fitnexp's backend is configured and running.

This guide assumes that the mentioned prerequisites are already correctly configured.To install and configure the frontend of this application, follow these steps:

### Clone the Repository

First, clone the application's repository from GitHub:

```
git clone https://github.com/Fitnexp/fitnexp-frontend.git
cd fitnexp-frontend
```

### Install dependencies

Install the necessary dependencies using npm:

```
npm install
```

### Configure the .env file

Create a .env file in the root of the project and copy the provided content:

```
VITE_SERVER_URI=
```

Where `VITE_SERVER_URI` is the URL where the backend server is running. Example: `http://localhost:8080`

### Run the application

To start the application in development mode, use the following command:

```
npm run dev
```

This will start the server, also make sure that the backend server is up and its URL matches the one set in the `.env` file. If everything went well, you will see a message similar to this one:

```
VITE v5.3.4  ready in 267 ms

Local:   http://localhost:5173/
Network: use --host to expose
press h + enter to show help
```

If you're interested, you can see a list of all the available scripts in the application by running the following command:

```
npm run
```

### Run tests

To run the tests, execute the following command:

```
npm run test
```
