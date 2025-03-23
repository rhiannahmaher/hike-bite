<!-- Table of Contents -->
# Table of Contents

- [About the Project](#about-the-project)
  * [Tech Stack](#tech-stack)
  * [Features](#features)
- [Getting Started](#getting-started)
  * [Environment Variables](#environment-variables)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
- [Usage](#usage)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
  
<!-- About the Project -->
## About the Project

Hike&Bite is a web application that allows hikers to log their favourite food stops along hiking trails. The application provides users with information about various types of stops (cafes, restaurants, pubs, and bakeries) located along different trails, ensuring that hikers have a great experience both on and off the trail. 

<!-- TechStack -->
### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://handlebarsjs.com/">Handlebars.js</a></li>
    <li><a href="https://bulma.io/">Bulma CSS</a></li>
    <li><a href="https://studio3t.com/">Studio 3T</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://hapi.dev/">Hapi.js</a></li>
    <li><a href="https://nodejs.org/">Node.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->
### Features

- Trail Information: Users can add hiking trails.
- Stop Information: Users can add stops and each stop allows users to provide useful details such as operating hours, location, and description.
- User Authentication: Users can sign up, log in, and securely store their credentials.

<!-- Getting Started -->
## Getting Started

<!-- Env Variables -->
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

- `cookie_name=hikebitetime`
- `cookie_password=COOKIE_EMCRYPTION_KEY_HERE_MUST_BE_32_CHARCTERS_OR_MORE`
- `db=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority&appName=<your-app-name>`

To do so, create a `.env` file in the root directory of the project. You can copy the content from the `.env_example` file and modify it with your own details:

    ```bash
    cp .env_example .env
    ```
    
Update the following fields in your `.env` file:

- `cookie_password`
- `db`: Link to your cloud database

<!-- Prerequisites -->
### Prerequisites

Before you begin, ensure that you have the following:

- **Node.js** (version 16.0 or higher) – Your project requires Node.js to run the server. You can download and install Node.js from [here](https://nodejs.org/).
- **MongoDB** – You can either set up a local MongoDB server or use a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

Follow these steps to get your environment set up:

**Clone the repository**:
Open your terminal or command prompt and run the following command to clone the repository:

    ```bash
        git clone https://github.com/rhiannahmaher/hike-bite.git
    ```

**Navigate to the project directory**:

    ```bash
        cd your-project-name
    ```

**Install the dependencies**:
Run the following command to install all the necessary packages:

    ```bash
        npm install
    ```

**Set up environment variables**:
 Create a `.env` file and update `env_example`

**Run the application**:
Once everything is set up, you can start the development server:

    ```bash
        npm start
    ```

This will start the Node.js server, and you should be able to access the application at `http://localhost:3000`

### Deployment

Application is available to view via Glitch [here](https://frosted-thread-dimple.glitch.me/)

<!-- Usage -->
## Usage

**Hike&Bite** is a web application designed to assist hikers in discovering key food stops along their hike, such as cafes, restaurants, and other points of interest.

### Purpose
The primary goal of Hike&Bite is to help hikers plan their trips more efficiently by providing access to important stops along popular hiking trails. 
Trail maps can have limited information at times so it helps enhance the hiking experience by allowing hikers to log points of interest available on trails.

### Target Audience
Hike&Bite is perfect for hikers or anyone who enjoys spending time outdoors.
Additionally, it can be useful for developers who wish to integrate hiking trail data into their own applications or websites.

<!-- Contact -->
## Contact

Rhiannah Maher - 20085527@mail.wit.ie

Project Link: [https://github.com/rhiannahmaher/hike-bite](https://github.com/rhiannahmaher/hike-bite)

<!-- Acknowledgments -->
## Acknowledgements

 - [Awesome README](https://github.com/matiassingers/awesome-readme)
