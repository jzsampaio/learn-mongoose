const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  name: String,
}, {
  toJSON: { virtuals: true },    
  toObject: { virtuals: true },    
});

MediaSchema.virtual('tags', {
  ref: 'MediaTag',
  localField: '_id',
  foreignField: 'media'
});

module.exports = MediaSchema;
