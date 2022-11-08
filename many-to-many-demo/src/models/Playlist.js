const mongoose = require("mongoose");
const MediaSchema = require("./Media")

const Playlist = mongoose.model(
  "Playlist",
  new mongoose.Schema({
    name: String,
    medias:
      {
        type: [MediaSchema],
      }
  }, {
    toJSON: { virtuals: true },    
    toObject: { virtuals: true },    
  })
);

module.exports = Playlist;
