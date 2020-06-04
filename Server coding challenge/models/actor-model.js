const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  actor_ID: {
    type: Number,
    unique: true,
    required: true,
  },
});

const actorsCollection = mongoose.model("actors", actorsSchema);

const Actors = {
  createActor: function (newActor) {
    return actorsCollection
      .create(newActor)
      .then((createdActor) => {
        return createdActor;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getActorByID: function (actor_ID) {
    return actorsCollection
      .findById(actor_ID)
      .then((actor) => {
        return actor;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getActorByName: function (firstName, lastName) {
    return actorsCollection.findOne({ firstName, lastName }).then((actor) => {
      return actor;
    });
  },
};

module.exports = {
  Actors,
};
