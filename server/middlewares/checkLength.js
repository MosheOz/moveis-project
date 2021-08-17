// verify title length
const checkLength = (req, res, next) => {
  const { title } = req.body;
  if (title.length > 30) {
    return res
      .status(400)
      .send({ err: "Title can't be longer than 30 characters" });
  }
  next();
};

module.exports = checkLength;
