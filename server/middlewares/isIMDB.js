const axios = require("axios");

const isIMDB = async (req, res, next) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 202
    ) {
      return res
        .status(401)
        .send({ error: "Movie link must be a valid IMDB link" });
    }
  } catch (err) {
    return res
      .status(401)
      .send({ error: "Movie link must be a valid IMDB link" });
  }

  if (extractHostname(url)) {
    return res.status(401).send({ error: "Movie link must be an IMDB link" });
  }
  next();
};

function extractHostname(url) {
  const domain = url.split("/")[2];
  return domain !== "imdb.com" && domain !== "www.imdb.com";
}

module.exports = isIMDB;
