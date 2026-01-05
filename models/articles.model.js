const db = require("../db/connection.js");

function fetchArticles() {
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
      return rows;
    });
}

function fetchArticleById(article_id) {
  return db
    .query(
      `SELECT
       author, title, article_id, body, topic,
       created_at, votes, article_img_url
     FROM articles
     WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      }

      return rows[0];
    });
}

function fetchCommentsByArticleId(article_id) {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
       FROM comments
       WHERE article_id = $1
       ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function fetchUpdatedArticle(inc_votes, article_id) {
  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *
  ;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  fetchUpdatedArticle,
};
