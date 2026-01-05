const db = require("../db/connection.js");

function postComment(author, body, article_id) {
  return db
    .query(
      `INSERT INTO comments
  (author, body, article_id)
VALUES
  ($1, $2, $3) RETURNING *;`,
      [author, body, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function removeComment(comment_id) {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { postComment, removeComment };
