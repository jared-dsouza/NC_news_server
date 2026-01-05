const fetchUsers = require("../models/users.model");

function getUsers(req, res) {
  return fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
}

module.exports = getUsers;
