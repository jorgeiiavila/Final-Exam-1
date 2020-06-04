const { Movies } = require("../models/movie-model");
const { Actors } = require("../models/actor-model");

async function errorHandler(req, res, next) {
  const body = req.body;
  console.log(body);
  const { movie_ID } = req.params;

  if (!body.id) {
    res.statusMessage = "Id is missing in the body of the request.";
    return res.status(406).end();
  }
  if (body.id !== Number(movie_ID)) {
    res.statusMessage = "id and movie_ID do not match";
    return res.status(409).end();
  }
  if (!body.firstName || !body.lastName) {
    res.statusMessage =
      "You need to send both firstName and lastName of the actor to add to the movie list";
    return res.status(403).end();
  }

  try {
    const movie = await Movies.getMovieByID(movie_ID);
    const actor = await Actors.getActorByName(body.firstName, body.lastName);

    if (!movie || !actor) {
      res.statusMessage = "The actor or movie do not exist";
      return res.status(404).end();
    }
    res.locals.actor = actor;
    next();
  } catch (err) {
    res.statusMessage = "Internal server error";
    return res.status(500).end();
  }
}

module.exports = errorHandler;
