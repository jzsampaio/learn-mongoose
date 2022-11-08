const mongoose = require("mongoose");
const db = require("./models");

const createPlaylist = async (o) => {
  const doc = await db.Playlist.create(o)
  console.log("\n>> Created Playlist:\n", doc);
  return doc
};

const createTag = function(tag) {
  return db.Tag.create(tag).then(docTag => {
    console.log("\n>> Created Tag:\n", docTag);
    return docTag;
  });
};

const addTagToMedia = async function(playlistId, mediaId, tag) {
  // TODO createIfNotFound
  const docMediaTag = await db.MediaTag.create({media: mediaId, tag: tag._id})
  await docMediaTag.populate(['tag'])
  console.log("\n>> Added tag to media:\n", docMediaTag);
  return docMediaTag;
};

const run = async function() {
  await db.Playlist.deleteMany({});
  await db.Tag.deleteMany({});
  await db.MediaTag.deleteMany({});
  
  var m1Id = mongoose.Types.ObjectId()
  var m2Id = mongoose.Types.ObjectId()
  var pl1 = await createPlaylist({
    name: "PL#1",
    medias: [{_id: m1Id, name: "M#1"},
	     {_id: m2Id, name: "M#2"}]
  });

  var tag1 = await createTag({
    kind: "mediaKind",
    value: "documentary",
  });

  var tag2 = await createTag({
    kind: "mediaKind",
    value: "bp-select",
  });

  var tag3 = await createTag({
    kind: "contentDescription",
    value: "truth",
  });

  var tag4 = await createTag({
    kind: "contentDescription",
    value: "freedom",
  });

  // p1.m1 is a documentary abouth truth
  await addTagToMedia(pl1._id, m1Id, tag1)
  await addTagToMedia(pl1._id, m1Id, tag3)

  // p1.m2 is a movie (bp-select) on freedom
  await addTagToMedia(pl1._id, m2Id, tag2)
  await addTagToMedia(pl1._id, m2Id, tag4)

  pl1 = await db.Playlist.findOne({_id: pl1._id})
  await pl1.populate({
    path: "medias.tags",
    populate: "tag",
  })
  console.log("\n>> PL1 right now\n", pl1)
  console.log("\n>> PL1.m1 tags\n", pl1.medias[0].tags)
  console.log("\n>> PL1.m2 tags\n", pl1.medias[1].tags)
};

mongoose
  .connect("mongodb://localhost/many-to-many-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

run();
