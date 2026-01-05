const { postComment, removeComment } = require("../models/comments.model");

function addComments(req, res, next) {
  const { article_id } = req.params;
  const { author, body } = req.body;
  return postComment(author, body, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  const { comment_id } = req.params;
  return removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
}

module.exports = { addComments, deleteComment };
