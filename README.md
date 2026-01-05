# NC News Seeding

- Left Click on the NORTHCODERS-NEWS-BE folder in the navigator and make 2 files
  1. .env.test (for the test database).
  2. .env.development (for the development database).

When accessing a single database, it is possible to store the database name in a .env file and use the dotenv package to read this file and set the environment variable of PGDATABASE to the process.env. When there are different databases to connect to depending on the environment, separate .env files are needed.

In .env.test:

PGDATABASE=test_database_name
In .env.development:

PGDATABASE=development_database_name

**NC News Backend API**

**Overview**  
This project is a RESTful API for NC News, a site that collects news similar to Reddit. It provides endpoints to access and manage articles, topics, users, and comments. The backend uses Node.js and PostgreSQL, and it includes data for both development and test environments. The API allows users to interact with application data, mimicking how real backend services work with front-end applications.

**Technologies Used**

- **Node.js:** This is the server runtime environment.
- **Express.js:** This web framework helps build the API.
- **PostgreSQL:** This is a relational database management system.
- **node-postgres (pg):** This library helps connect to PostgreSQL databases.
- **Jest:** This framework is used for unit and integration tests.
- **Other dependencies:** These may include dotenv for environment variables, supertest for API testing, and tools for data manipulation (check package.json for the complete list).

**Hosted Version**  
You can access the API at \***\*\_\*\***. Usually, you can deploy to a platform like Render by linking your GitHub repository, setting environment variables for the database (like using a PostgreSQL add-on), and configuring build commands such as `npm install` and the start command `npm start`.

**Prerequisites**  
To run this project locally, you need:

- Node.js (version 14 or higher recommended).
- PostgreSQL (installed and running locally).
- Access to a PostgreSQL user who can create databases (default user is postgres).

**Getting Started Locally**
Follow these steps to set up and run the project on a new machine:

1. Clone the Repository:
   git clone https://github.com/northcoders/northcoders-news-BE.git
   cd <repository-directory>

Note: Clone (do not fork) as per project instructions.

2. Install Dependencies
   npm install

3. Set Up Environment Variables:
   Create two .env files in the root directory for development and testing environments:

.env.development:textPGDATABASE=nc_news
.env.test:textPGDATABASE=nc_news_test

These connect to different databases based on the environment. Add .env.\* to .gitignore to avoid committing sensitive info.

4. Create Databases:
   Ensure PostgreSQL is running. Create the databases manually if not handled by scripts:
   psql -U postgres
   CREATE DATABASE nc_news;
   CREATE DATABASE nc_news_test;
   \q

(Replace postgres with your PostgreSQL username if different.)

5. Seed the Databases:
   For development database
   npm run seed-dev

This creates tables (topics, users, articles, comments) and inserts data from /db/data.
For test database (runs tests to verify seeding)

6. Run Tests

npm test # Runs all tests, including API endpoint tests if implemented.

Start the Development Server:textnpm start # Or 'npm run dev' if aliasedThe server should now be running on http://localhost:3000 (or configured port). You can test endpoints using tools like Postman or curl.
