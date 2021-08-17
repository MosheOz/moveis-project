const getData = require("../utils/get-movies");

const isMovieExist = async (req, res, next) => {
  const { title } = req.body;

  const movies = await getData();

  const isMovieExist = movies.find((m) => m.title === title);

  if (isMovieExist) {
    return res.status(403).send({ error: "Movie already exist" });
  }
  next();
};

module.exports = isMovieExist;
