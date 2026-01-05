const fetchTopics = require("../models/topics.model");

function getTopics(req, res) {
  return fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

module.exports = getTopics;
