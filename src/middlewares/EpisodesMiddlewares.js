const {
  episodesCOL,
  ObjectId,
  dbconnect,
  dbclose,
} = require("../database/database");

const checkID = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res
      .status(400)
      .json({
        error: "this is not a valid id to the TARDIS data core. try again.",
      });
    return;
  }

  try {
    await dbconnect();
    const episodeFound = await episodesCOL.findOne({ _id: ObjectId(id) });
    await dbclose();
    if (!episodeFound) {
      return res
        .status(404)
        .json({
          error: "no data found on TARDIS data core with this ID. try again",
        });
    }
    res.episode = episodeFound;
  } catch (err) {
    console.error(`Error on checkID middleware. 
        Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "the safety precaution system prevented the TARDIS to materialize inside a stone. please, try again.",
      });
  }

  next();
};

const checkEmptyInput = (req, res, next) => {
  const episodeCreate = req.body;

  if (
    !episodeCreate ||
    !episodeCreate.name ||
    !episodeCreate.season ||
    !episodeCreate.number ||
    !episodeCreate.shorthand ||
    !episodeCreate.bio ||
    !episodeCreate.firstRelease ||
    !episodeCreate.tardisDataCoreURI ||
    !episodeCreate.imgURI
  ) {
    res
      .status(400)
      .json({
        error: `all fields are required to save a new object to TARDIS data core! refer to documentation.`,
      });
    return;
  }

  next();
};

const sanitizeInput = async (req, res, next) => {
  const incomingObject = req.body;
  const sanitizedObject = {
    name: incomingObject.name,
    season: incomingObject.season,
    number: incomingObject.number,
    shorthand: incomingObject.shorthand,
    bio: incomingObject.bio,
    firstRelease: incomingObject.firstRelease,
    tardisDataCoreURI: incomingObject.tardisDataCoreURI,
    imgURI: incomingObject.imgURI,
  };

  res.locals.episode = sanitizedObject;
  console.log(`res.locals.episode in sanitizeInput: ${res.locals.episode}`);

  next();
};

module.exports = {
  checkID,
  checkEmptyInput,
  sanitizeInput,
};
