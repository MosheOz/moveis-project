const router = require("express").Router();

const getUsers = require("../utils/get-users");

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ err: "Usernaem and password must be provided" });
    }
    const users = await getUsers();

    const user = users.find((u) => u.name === name && u.password === password);
    if (!user) {
      return res.status(400).json({ err: "usernaem or password invalid" });
    }

    res.json(user);
  } catch (err) {
    console.log("login err: ", err.message);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
