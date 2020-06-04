const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const { Movies } = require("./models/movie-model");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(jsonParser);

app.patch("/api/add-movie-actor/:movie_ID", errorHandler, async (req, res) => {
  const { movie_ID } = req.params;
  const actor = res.locals.actor;
  console.log(actor);
  try {
    const movie = await Movies.addActorToMovieList(movie_ID, actor);
    console.log(movie);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
