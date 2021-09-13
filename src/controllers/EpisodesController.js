const {
  episodesCOL,
  dbconnect,
  dbclose,
  ObjectId,
} = require("../database/database");

const getAll = async (req, res) => {
  try {
    await dbconnect();
    let episodes = episodesCOL.find({});
    let episodesArr = await episodes.toArray();
    await dbclose();
    return res.json(episodesArr);
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
    const episodeFound = await episodesCOL.findOne({ _id: ObjectId(id) });
    await dbclose();

    if (!episodeFound) {
      return res
        .status(404)
        .json({ error: "episode not found inside the TARDIS data core." });
    } else {
      return res.send(episodeFound);
    }
  } catch (err) {
    console.error(`Error when doing getById_Episode. 
        Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later.",
      });
  }
};

const updateEpisode = async (req, res) => {
  const { id } = req.params;
  const episodePut = req.body;

  try {
    await dbconnect();

    const filterQuery = { _id: ObjectId(id) };
    const updateObject = { $set: episodePut };
    const updateOptions = { upsert: true };

    const episodeUpdating = await episodesCOL.findOneAndUpdate(
      filterQuery,
      updateObject,
      updateOptions
    );

    const episodeUpdated = await episodesCOL.findOne(filterQuery);

    await dbclose();

    episodeUpdating.lastErrorObject.updatedExisting
      ? res.json(episodeUpdated)
      : res
          .status(500)
          .json({
            error:
              "failed to update object. TARDIS data core overheated. try again later.",
          });

    if (episodeUpdating.lastErrorObject.updatedExisting) {
      res.json(episodeUpdated);
    } else if (
      !episodeUpdating.lastErrorObject.updatedExisting &&
      episodeUpdating.value
    ) {
      res.status(201).json(episodeUpdated);
    }
  } catch (err) {
    console.error(`Error when doing updateEpisode. Error: ${err}`);
    return res
      .status(500)
      .send({
        error:
          "it appears the TARDIS has no energy now and entered safe mode. try again later.",
      });
  }
};

const createEpisode = async (req, res) => {
  const episodeToCreate = res.locals.episode;
  console.log(`res.locals.episode in createEpisode: ${res.locals.episode}`);
  try {
    await dbconnect();

    result = await episodesCOL.insertOne(episodeToCreate);
    let episodeCreated = await episodesCOL.findOne({
      _id: ObjectId(result.insertedId),
    });

    await dbclose();

    result.acknowledged
      ? res.status(201).json(episodeCreated)
      : res
          .status(500)
          .json({ error: "the data core is overheated. try again later." });
  } catch (err) {
    console.error(`Error occured when trying createEpisode.
        Error: ${err}`);
    return res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const deleteEpisode = async (req, res) => {
  const { id } = req.params;

  try {
    await dbconnect();

    let deleteResult = await episodesCOL.deleteOne({ _id: ObjectId(id) });

    await dbclose();

    deleteResult.deletedCount === 1
      ? res.status(204).send()
      : res.status(500).json({
          error: "could not delete the episode now. try again later.",
        });
  } catch (err) {
    console.error(`Error when trying deleteEpisode.
        Error: ${err}`);
    res
      .status(500)
      .json({
        error: "the TARDIS data core is not responding. try again later.",
      });
  }
};

const filterAllEpisodes = async (req, res) => {
  let { name, season, number, shorthand, bio, firstRelease } = req.query;

  !name ? (name = "") : (name = name);
  !season ? (season = "") : (season = season);
  !number ? (number = "") : (number = number);
  !shorthand ? (shorthand = "") : (shorthand = shorthand);
  !bio ? (bio = "") : (bio = bio);
  !firstRelease ? (firstRelease = "") : (firstRelease = firstRelease);

  try {
    await dbconnect();
    let episodes = await episodesCOL.find({
      name: { $regex: name, $options: "i" },
      season: { $regex: season, $options: "i" },
      number: { $regex: number, $options: "i" },
      shorthand: { $regex: shorthand, $options: "i" },
      bio: { $regex: bio, $options: "i" },
      firstRelease: { $regex: firstRelease, $options: "i" },
    });
    let episodesArr = await episodes.toArray();
    await dbclose();

    if (episodesArr.length === 0) {
      return res.status(404).json({ error: "no episodes found." });
    } else {
      return res.send(episodesArr);
    }
  } catch (err) {
    console.error(`Error when doing filterAllEpisodes. Error: ${err}`);
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
  updateEpisode,
  createEpisode,
  deleteEpisode,
  filterAllEpisodes,
};
