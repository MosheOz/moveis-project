const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "..", "movies.json");

// read file
const getData = async () => {
  return new Promise((resolve) => {
    try {
      fs.readFile(jsonPath, "utf8", function (err, data) {
        if (err) return resolve({ error: err });
        resolve(JSON.parse(data));
      });
    } catch (err) {
      resolve({ error: err });
    }
  });
};

module.exports = getData;
