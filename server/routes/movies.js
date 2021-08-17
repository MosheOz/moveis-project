const fs = require("fs");
const path = require("path");
const router = require("express").Router();

const checkLength = require("../middlewares/checkLength");
const isAdmin = require("../middlewares/isAdmin");
const isEnglish = require("../middlewares/isEnglish");
const isIMDB = require("../middlewares/isIMDB");
const isMovieExist = require("../middlewares/isMovieExist");
const validateImage = require("../middlewares/validateImage");
const getData = require("../utils/get-movies");

router.get("/movies", async (req, res) => {
  const data = await getData();
  res.send(data);
});

router.put(
  "/movies",
  isAdmin,
  isEnglish,
  checkLength,
  isIMDB,
  validateImage,
  async (req, res) => {
    try {
      const data = await editData(req.body);
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: "Edit failed" });
    }
  }
);

router.post(
  "/movies",
  isAdmin,
  isMovieExist,
  isEnglish,
  checkLength,
  isIMDB,
  validateImage,
  async (req, res) => {
    const data = await addData(req.body);

    res.send(data);
  }
);

const jsonPath = path.join(__dirname, "..", "movies.json");

// edit file
const editData = async (body) => {
  const { id, title, category, url, image } = body;

  const data = await getData();

  try {
    const newData = data.map((movie) => {
      if (movie.id === id) return { id, title, category, url, image };
      return movie;
    });

    fs.writeFileSync(jsonPath, JSON.stringify(newData));
    return newData;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

// Add to file
const addData = async (body) => {
  const { title, category, url, image } = body;

  try {
    let data = await getData();

    if (data.some((m) => m.title === title)) return false;

    data = [
      ...data,
      { id: Math.round(Math.random() * 100000), title, category, url, image },
    ];

    fs.writeFileSync(jsonPath, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

module.exports = router;
