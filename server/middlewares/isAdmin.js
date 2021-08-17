const getUsers = require("../utils/get-users");

const isAdmin = async (req, res, next) => {
  let { userId } = req.body;

  if (!userId) {
    userId = req.params.userId;
    console.log("userId ", userId);
    if (!userId) return res.status(403).send({ err: "No permissions" });
  }

  const users = await getUsers();

  const isAdmin = users.find((u) => u.id === userId);

  if (!isAdmin) {
    return res.status(403).send({ error: "No permissions " });
  }
  next();
};

module.exports = isAdmin;
