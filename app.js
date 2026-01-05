const cors = require("cors");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

const express = require("express");
const app = express();

const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  getUpdatedArticle,
} = require("./controllers/articles.controller");

const getUsers = require("./controllers/users.controller");
const getTopics = require("./controllers/topics.controller");
const {
  addComments,
  deleteComment,
} = require("./controllers/comments.controller");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", addComments);

app.patch("/api/articles/:article_id", getUpdatedArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
