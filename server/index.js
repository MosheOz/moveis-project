const express = require("express");
const cors = require("cors");
const movies = require("./routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", movies);

const PORT = 3000;

app.listen(PORT, console.log("Server is running on port " + PORT));
