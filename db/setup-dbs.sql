DROP DATABASE IF EXISTS nc_news;
CREATE DATABASE nc_news;

DROP DATABASE IF EXISTS nc_news_test;
CREATE DATABASE nc_news_test;

\c nc_news

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS topics;

CREATE TABLE topics (
    slug SERIAL PRIMARY KEY UNIQUE,
    slug_description VARCHAR(100), 
    img_url_file VARCHAR(100)
);

CREATE TABLE users (
    username SERIAL PRIMARY KEY UNIQUE,
    user_name VARCHAR(100), 
    avatar_url VARCHAR(100)
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100), 
    topic VARCHAR(100), 
    author VARCHAR(100), 
    body VARCHAR(100),
    created_at TIMESTAMPTZ,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(100)

    FOREIGN KEY (topic) REFERENCES topics(slug),
    FOREIGN KEY (author) REFERENCES users(username),
    
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id VARCHAR(100), 
    body VARCHAR(100),
    created_at TIMESTAMPTZ,
    votes INT DEFAULT 0,
    author VARCHAR(100),
    created_at TIMESTAMPTZ,

    FOREIGN KEY (article_id) REFERENCES article_id(articles),
    FOREIGN KEY (author) REFERENCES username(users),
);