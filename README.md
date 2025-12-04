# NC News Seeding

- Left Click on the NORTHCODERS-NEWS-BE folder in the navigator and make 2 files
    1. .env.test (for the test database).
    2. .env.development (for the development database).

When accessing a single database, it is possible to store the database name in a .env file and use the dotenv package to read this file and set the environment variable of PGDATABASE to the process.env. When there are different databases to connect to depending on the environment, separate .env files are needed.

In .env.test:

PGDATABASE=test_database_name
In .env.development:

PGDATABASE=development_database_name