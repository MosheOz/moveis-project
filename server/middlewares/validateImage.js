const axios = require("axios");

const validateImage = async (req, res, next) => {
  const { url, image } = req.body;

  const id = extractId(url);

  if (!id) {
    return res
      .status(401)
      .send({ error: "Movie link must be a valid IMDB link" });
  }

  const API = `https://imdb-api.com/en/API/Search/k_7zqce44j/${id}`;

  try {
    const response = await axios.get(API);
    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 202
    ) {
      return res
        .status(401)
        .send({ error: "Movie link must be a valid IMDB link" });
    }

    const moviePosterArray = response.data.results[0].image.split("/");
    const imageArray = image.split("/");

    const isPosterHash =
      moviePosterArray[moviePosterArray.length - 1].split(".")[0] ===
      imageArray[imageArray.length - 1].split(".")[0];

    if (!isPosterHash) {
      return res
        .status(401)
        .send({ error: "Image link should be IMDB and Movie Poster only!" });
    }
  } catch (err) {
    return res
      .status(401)
      .send({ error: "Movie link must be a valid IMDB link" });
  }

  next();
};

function extractId(url) {
  return url.split("/title/")[1].split("/")[0];
}

module.exports = validateImage;
