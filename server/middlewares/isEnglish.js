// verify english characters
const isEnglish = (req, res, next) => {
  const { title, category, url, image } = req.body;
  if (testCharacters(title) || testCharacters(category)) {
    return res
      .status(401)
      .send({ error: "Can't contain non english characters" });
  }
  next();
};

const testCharacters = (text) => {
  const disAllowed = /[^a-z0-9_.,-]/i;
  const textArray = text.split(" ");

  return textArray.some((t) => disAllowed.test(t));
};

module.exports = isEnglish;
