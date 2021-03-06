const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  movie_ID: {
    type: Number,
    unique: true,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actors",
      required: true,
    },
  ],
});

const moviesCollection = mongoose.model("movies", moviesSchema);

const Movies = {
  createMovie: function (newMovie) {
    return moviesCollection
      .create(newMovie)
      .then((createdMovie) => {
        return createdMovie;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getMovieByID: function (movie_ID) {
    return moviesCollection
      .findOne({ movie_ID })
      .then((movie) => {
        return movie;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  addActorToMovieList: function (movie_ID, actor) {
    return moviesCollection
      .findOne({ movie_ID })
      .then((movie) => {
        movie.actors.push(actor);
        return movie.save();
      })
      .then((movie) => movie)
      .catch((err) => {
        throw new Error(err);
      });
  },
};

module.exports = {
  Movies,
};
