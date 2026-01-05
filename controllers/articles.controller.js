const {
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  fetchUpdatedArticle,
} = require("../models/articles.model");

function getArticles(req, res, next) {
  return fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  return fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
}

function getCommentsByArticleId(req, res, next) {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(() => fetchCommentsByArticleId(article_id))
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
}

function getUpdatedArticle(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  return fetchUpdatedArticle(inc_votes, article_id)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
}

//   const promises = [
//     fetchArticlesById(article_id),
//     fetchCommentsByArticleId(article_id),
//   ];

//   Promise.all(promises)
//     .then(([article, comments]) => {
//       res.status(200).send({ comments });

//       next();
//     })
//     .catch(next);
// }

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  getUpdatedArticle,
};
