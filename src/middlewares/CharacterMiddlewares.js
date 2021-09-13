const {
  charactersCOL,
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
    const characterFound = await charactersCOL.findOne({ _id: ObjectId(id) });
    await dbclose();
    if (!characterFound) {
      return res
        .status(404)
        .json({
          error: "no data found on TARDIS data core with this ID. try again",
        });
    }
    res.character = characterFound;
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
  const characterCreate = req.body;

  if (
    !characterCreate ||
    !characterCreate.name ||
    !characterCreate.regenerationCount ||
    !characterCreate.species ||
    !characterCreate.bio ||
    !characterCreate.birthDate ||
    !characterCreate.deathDate ||
    !characterCreate.spouse ||
    !characterCreate.firstMentioned ||
    !characterCreate.firstAppearance ||
    !characterCreate.lastAppearance ||
    !characterCreate.allAppearances ||
    !characterCreate.actorOrActress ||
    !characterCreate.tardisDataCoreURI ||
    !characterCreate.imgURI
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
    regenerationCount: incomingObject.regenerationCount,
    species: incomingObject.species,
    bio: incomingObject.bio,
    birthDate: incomingObject.birthDate,
    deathDate: incomingObject.deathDate,
    spouse: incomingObject.spouse,
    firstMentioned: incomingObject.firstMentioned,
    firstAppearance: incomingObject.firstAppearance,
    lastAppearance: incomingObject.lastAppearance,
    allAppearances: incomingObject.allAppearances,
    actorOrActress: incomingObject.actorOrActress,
    tardisDataCoreURI: incomingObject.tardisDataCoreURI,
    imgURI: incomingObject.imgURI,
  };

  res.locals.character = sanitizedObject;
  console.log(`res.locals.character in sanitizeInput: ${res.locals.character}`);

  next();
};

module.exports = {
  checkID,
  checkEmptyInput,
  sanitizeInput,
};
