const express = require("express");
const app = express();
const db = require("./db/connection.js");
const articles = require("./db/data/test-data/articles.js");
const users = require("./db/data/test-data/users.js");

app.use(express.json());

app.get("/api/topics", (req, res, next) => {
  return db.query(`SELECT * FROM topics `).then(({ rows }) => {
    res.status(200).send({ topics: rows });
    next();
  });
});

app.get("/api/articles", (req, res, next) => {
  return db
    .query(
      `SELECT 
      a.article_id,
      a.title,
      a.topic,
      a.author,
      a.created_at,
      a.votes,
      a.article_img_url,
      COUNT(c.comment_id) AS comment_count
    FROM articles a
    LEFT JOIN comments c ON a.article_id = c.article_id
    GROUP BY a.article_id
    ORDER BY a.created_at DESC;`
    )
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
      next();
    });
});

app.get("/api/users", (req, res, next) => {
  return db
    .query(
      `
      SELECT username, name, avatar_url 
      FROM users;
    `
    )
    .then(({ rows }) => {
      res.status(200).send({ user: rows });
      next();
    });
});
console.log("hello");

module.exports = app;
