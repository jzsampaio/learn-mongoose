const mongoose = require("mongoose");

const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    kind: String,
    value: String,
  })
);

module.exports = Tag;
