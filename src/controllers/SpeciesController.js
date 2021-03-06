const {
  speciesCOL,
  dbconnect,
  dbclose,
  ObjectId,
} = require("../database/database");

const getAll = async (req, res) => {
  try {
    await dbconnect();
    let species = speciesCOL.find({});
    let speciesArr = await species.toArray();
    await dbclose();
    return res.json(speciesArr);
  } catch (err) {
    console.log(`Error when doing getAll. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it seems the TARDIS telepathic circuits are overloaded right now. try again later.",
      });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    await dbconnect();
    const specieFound = await speciesCOL.findOne({ _id: ObjectId(id) });
    await dbclose();

    if (!specieFound) {
      return res
        .status(404)
        .json({ error: "specie not found inside the TARDIS data core." });
    } else {
      return res.send(specieFound);
    }
  } catch (err) {
    console.error(`Error when doing getById_Specie. 
        Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later.",
      });
  }
};

const updateSpecie = async (req, res) => {
  const { id } = req.params;
  const speciePut = req.body;

  try {
    await dbconnect();

    const filterQuery = { _id: ObjectId(id) };
    const updateObject = { $set: speciePut };
    const updateOptions = { upsert: true };

    const specieUpdating = await speciesCOL.findOneAndUpdate(
      filterQuery,
      updateObject,
      updateOptions
    );

    const specieUpdated = await speciesCOL.findOne(filterQuery);

    await dbclose();

    specieUpdating.lastErrorObject.updatedExisting
      ? res.json(specieUpdated)
      : res
          .status(500)
          .json({
            error:
              "failed to update object. TARDIS data core overheated. try again later.",
          });

    if (specieUpdating.lastErrorObject.updatedExisting) {
      res.json(specieUpdated);
    } else if (
      !specieUpdating.lastErrorObject.updatedExisting &&
      specieUpdating.value
    ) {
      res.status(201).json(specieUpdated);
    }
  } catch (err) {
    console.error(`Error when doing updateSpecie. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it appears the TARDIS has no energy now and entered safe mode. try again later.",
      });
  }
};

const createSpecie = async (req, res) => {
  const specieToCreate = res.locals.specie;
  console.log(`res.locals.specie in createSpecie: ${res.locals.specie}`);
  try {
    await dbconnect();

    result = await speciesCOL.insertOne(specieToCreate);
    let specieCreated = await speciesCOL.findOne({
      _id: ObjectId(result.insertedId),
    });

    await dbclose();

    result.acknowledged
      ? res.status(201).json(specieCreated)
      : res
          .status(500)
          .json({ error: "the data core is overheated. try again later." });
  } catch (err) {
    console.error(`Error occured when trying createSpecie.
        Error: ${err}`);
    return res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const createMany = async (req, res) => {
  const speciesToCreate = req.body;

  let result;

  try {
    await dbconnect();
    let result = await speciesCOL.insertMany(speciesToCreate);
    await dbclose();
  
    let ids = result.insertedIds;

    if (result.acknowledged) {
      console.log(`${result.insertedCount} documents were inserted.`);
      for (let id of Object.values(ids)) {
          console.log(`Inserted a document with id ${id}`);
      }
      return res.status(201).json({"message": `${result.insertedCount} documents were inserted.`, ids});
    } else {
      return res.status(500).json({"error": "the data core is overheated. try again later."});
    }
    
} catch(err) {
  if (result.acknowledged) {
  console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
  let ids = err.result.result.insertedIds;
  for (let id of Object.values(ids)) {
    console.log(`Processed a document with id ${id._id}`);
  }
  console.log(`Number of documents inserted: ${err.result.result.nInserted}`);
  console.log(`Number of documents skipped: ${err.result.result.nSkipped}`);
  console.log(`Error when trying createManyCharacters. Error: ${err}`)
  return res
      .status(500)
      .json({
        "error": `the TARDIS data core is not responding. try again later.`,
        "log1": `Number of documents inserted: ${err.result.result.nInserted}`,
        "log2": `Number of documents skipped: ${err.result.result.nSkipped}`,
      });
  } else {
    console.log(`Error when trying createManyCharacters. Error: ${err}`);
    return res
      .status(500)
      .json({
        "error": `the TARDIS data core is not responding. try again later.`,});
    }
  }
};

const deleteSpecie = async (req, res) => {
  const { id } = req.params;

  try {
    await dbconnect();

    let deleteResult = await speciesCOL.deleteOne({ _id: ObjectId(id) });

    await dbclose();

    deleteResult.deletedCount === 1
      ? res.status(204).send()
      : res.status(500).json({
          error: "could not delete the specie now. try again later.",
        });
  } catch (err) {
    console.error(`Error when trying deleteSpecie.
        Error: ${err}`);
    res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const filterAllSpecies = async (req, res) => {
  var {
    name,
    planet,
    firstMentioned,
    firstAppearance,
    lastAppearance,
    allAppearances,
    bio,
    biologicalType
  } = req.query;

  
  !name ? (name = "") : (name = name);
  !planet ? (planet = "") : (planet = planet);
  !firstMentioned ? (firstMentioned = "") : (firstMentioned = firstMentioned);
  !firstAppearance
    ? (firstAppearance = "")
    : (firstAppearance = firstAppearance);
  !lastAppearance ? (lastAppearance = "") : (lastAppearance = lastAppearance);
  !allAppearances ? (allAppearances = "") : (allAppearances = allAppearances);
  !bio ? (bio = "") : (bio = bio);
  !biologicalType ? (biologicalType = "") : (biologicalType = biologicalType);

  try {
    await dbconnect();
    let species = speciesCOL.find({
      name: { $regex: name, $options: "i" },
      planet: { $regex: planet, $options: "i" },
      firstMentioned: { $regex: firstMentioned, $options: "i" },
      firstAppearance: { $regex: firstAppearance, $options: "i" },
      lastAppearance: { $regex: lastAppearance, $options: "i" },
      allAppearances: { $regex: allAppearances, $options: "i" },
      bio: { $regex: bio, $options: "i" },
      biologicalType: { $regex: biologicalType, $options: "i" },
    });
    let speciesArr = await species.toArray();
    await dbclose();

    if (speciesArr.length === 0) {
      return res.status(404).json({ error: "no species found." });
    } else {
      return res.send(speciesArr);
    }
  } catch (err) {
    console.error(`Error when doing filterAllSpecies. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later.",
      });
  }
};

module.exports = {
  getAll,
  getById,
  updateSpecie,
  createSpecie,
  deleteSpecie,
  filterAllSpecies,
  createMany
};
