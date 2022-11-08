const mongoose = require("mongoose");
const Media = require("./Media")
const Tag = require("./Tag")

const MediaTag = mongoose.model(
  "MediaTag",
  new mongoose.Schema({
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media"
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    },
  })
);

module.exports = MediaTag;
