const {
  charactersCOL,
  dbconnect,
  dbclose,
  ObjectId,
} = require("../database/database");

const getAll = async (req, res) => {
  try {
    await dbconnect();
    let characters = charactersCOL.find({});
    let charactersArr = await characters.toArray();
    await dbclose();
    return res.json(charactersArr);
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
    const characterFound = await charactersCOL.findOne({ _id: ObjectId(id) });
    await dbclose();
    if (!characterFound) {
      return res
        .status(404)
        .json({ error: "character not found inside the TARDIS data core." });
    } else {
      return res.send(characterFound);
    }
  } catch (err) {
    console.error(`Error when doing getById_Character. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later.",
      });
  }
};

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const characterPut = req.body;

  try {
    await dbconnect();

    const filterQuery = { _id: ObjectId(id) };
    const updateObject = { $set: characterPut };
    const updateOptions = { upsert: true };

    const characterUpdating = await charactersCOL.findOneAndUpdate(
      filterQuery,
      updateObject,
      updateOptions
    );

    const characterUpdated = await charactersCOL.findOne(filterQuery);

    await dbclose();

    characterUpdating.lastErrorObject.updatedExisting
      ? res.json(characterUpdated)
      : res
          .status(500)
          .json({
            error:
              "failed to update object. TARDIS data core overheated. try again later.",
          });

    if (characterUpdating.lastErrorObject.updatedExisting) {
      res.json(characterUpdated);
    } else if (
      !characterUpdating.lastErrorObject.updatedExisting &&
      characterUpdating.value
    ) {
      res.status(201).json(characterUpdated);
    }
  } catch (err) {
    console.error(`Error when doing updateCharacter. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it appears the TARDIS has no energy now and entered safe mode. try again later.",
      });
  }
};

const createCharacter = async (req, res) => {
  const characterToCreate = res.locals.character;

  try {
    await dbconnect();

    const result = await charactersCOL.insertOne(characterToCreate);
    let characterCreated = await charactersCOL.findOne({
      _id: ObjectId(result.insertedId),
    });

    await dbclose();

    result.acknowledged
      ? res.status(201).json(characterCreated)
      : res
          .status(500)
          .json({ "error": "the data core is overheated. try again later." });
  } catch (err) {
    console.error(`Error occured when trying createCharacter.
        Error: ${err}`);
    return res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const createMany = async (req, res) => {
  const charactersToCreate = req.body;

  let result;

  try {
    await dbconnect();
    let result = await charactersCOL.insertMany(charactersToCreate);
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

const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    await dbconnect();

    let deleteResult = await charactersCOL.deleteOne({ _id: ObjectId(id) });

    await dbclose();

    deleteResult.deletedCount === 1
      ? res.status(204).send()
      : res.status(500).json({
          error: "could not delete the character now. try again later.",
        });
  } catch (err) {
    console.error(`Error when trying deleteCharacter.
        Error: ${err}`);
    res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const filterAllCharacters = async (req, res) => {
  var {
    name,
    regenerationCount,
    species,
    bio,
    birthDate,
    deathDate,
    spouse,
    firstMentioned,
    firstAppearance,
    lastAppearance,
    allAppearances,
    actorOrActress,
  } = req.query;

  
  !name ? (name = "") : (name = name);
  !regenerationCount
    ? (regenerationCount = "")
    : (regenerationCount = regenerationCount);
  !species ? (species = "") : (species = species);
  !bio ? (bio = "") : (bio = bio);
  !birthDate ? (birthDate = "") : (birthDate = birthDate);
  !deathDate ? (deathDate = "") : (deathDate = deathDate);
  !spouse ? (spouse = "") : (spouse = spouse);
  !firstMentioned ? (firstMentioned = "") : (firstMentioned = firstMentioned);
  !firstAppearance
    ? (firstAppearance = "")
    : (firstAppearance = firstAppearance);
  !lastAppearance ? (lastAppearance = "") : (lastAppearance = lastAppearance);
  !allAppearances ? (allAppearances = "") : (allAppearances = allAppearances);
  !actorOrActress ? (actorOrActress = "") : (actorOrActress = actorOrActress);

  // if (!name) {
  //   name = "";
  // }
  // if (!regenerationCount) {
  //   regenerationCount = "";
  // }
  // if (!species) {
  //   species = "";
  // }
  // if (!bio) {
  //   bio = "";
  // }
  // if (!birthDate) {
  //   birthDate = "";
  // }
  // if (!deathDate) {
  //   deathDate = "";
  // }
  // if (!spouse) {
  //   spouse = "";
  // }
  // if (!firstMentioned) {
  //   firstMentioned = "";
  // }
  // if (!firstAppearance) {
  //   firstAppearance = "";
  // }
  // if (!lastAppearance) {
  //   lastAppearance = "";
  // }
  // if (!allAppearances) {
  //   allAppearances = "";
  // }
  // if (!actorOrActress) {
  //   actorOrActress = "";
  // }
  
  console.log(`
    name: ${name}, 
    regenerationCount: ${regenerationCount},
    species: ${species},
    bio: ${bio},
    birthDate: ${birthDate},
    deathDate: ${deathDate},
    spouse: ${spouse},
    firstMentioned: ${firstMentioned},
    firstAppearance: ${firstAppearance},
    lastAppearance: ${lastAppearance},
    allAppearances: ${allAppearances},
    actorOrActress: ${actorOrActress}
  `)

  try {
    await dbconnect();
    let characters = await charactersCOL.find({
      name: { $regex: name, $options: "i" },
      regenerationCount: { $regex: regenerationCount, $options: "i" },
      species: { $regex: species, $options: "i" },
      bio: { $regex: bio, $options: "i" },
      birthDate: { $regex: birthDate, $options: "i" },
      deathDate: { $regex: deathDate, $options: "i" },
      spouse: { $regex: spouse, $options: "i" },
      firstMentioned: { $regex: firstMentioned, $options: "i" },
      firstAppearance: { $regex: firstAppearance, $options: "i" },
      lastAppearance: { $regex: lastAppearance, $options: "i" },
      allAppearances: { $regex: allAppearances, $options: "i" },
      actorOrActress: { $regex: actorOrActress, $options: "i" },
    });
    let charactersArr = await characters.toArray();
    await dbclose();

    console.log(`
    characters: ${characters}
    charactersArr: ${charactersArr}`);
    //return res.send(characters);

    if (charactersArr.length === 0) {
      return res.status(404).json({ error: "no characters found." });
    } else {
      return res.send(charactersArr);
    }
  } catch (err) {
    console.error(`Error when doing filterAllCharacters. Error: ${err}`);
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
  updateCharacter,
  createCharacter,
  deleteCharacter,
  filterAllCharacters,
  createMany
};
