const getUsers = require("../utils/get-users");

const isAdmin = async (req, res, next) => {
  const { userId } = req.body;

  const users = await getUsers();

  const isAdmin = users.find((u) => u.id === userId);

  if (!isAdmin) {
    return res.status(403).send({ error: "No permissions " });
  }
  next();
};

module.exports = isAdmin;
