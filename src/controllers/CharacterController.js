const { charactersCOL, dbconnect, dbclose, ObjectId } = require('../database/database')

const getAll = async (req, res) => {
    try {
        await dbconnect();
        let characters = charactersCOL.find({});
        let charactersArr = await characters.toArray();
        await dbclose();
        return res.json(charactersArr);
    } catch(err) {
        console.log(`Error when doing getAll. Error: ${err}`)
        return res.status(500).send({"error": "it seems the TARDIS telepathic circuits are overloaded right now. try again later."});
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    
    try {
        await dbconnect();
        const characterFound = await charactersCOL.findOne({_id: ObjectId(id)});
        await dbclose();
        return res.send(characterFound);
    } catch(err) {
        console.error(`Error when doing getById_Character. Error: ${err}`);
        return res.status(500).send({"error": "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later."});
    }
}

const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const characterPut = req.body;

    try {
        await dbconnect()

        const filterQuery = {_id: ObjectId(id)};
        const updateObject = { $set: characterPut };
        const updateOptions = { upsert: true }
       
        const characterUpdating = await charactersCOL.findOneAndUpdate(filterQuery, updateObject, updateOptions);

        const characterUpdated = await charactersCOL.findOne(filterQuery);

        await dbclose();

        characterUpdating.lastErrorObject.updatedExisting ? res.json(characterUpdated) : res.status(500).json({"error": "failed to update object. TARDIS data core overheated. try again later."});

        if (characterUpdating.lastErrorObject.updatedExisting) {
            res.json(characterUpdated)
        } else if (!characterUpdating.lastErrorObject.updatedExisting && characterUpdating.value) {
            res.status(201).json(characterUpdated)
        }

    } catch(err) {
        console.error(`Error when doing updateCharacter. Error: ${err}`);
        return res.status(500).send({"error": "it appears the TARDIS has no energy now and entered safe mode. try again later."});
    }
}

const createCharacter = async (req, res) => {
    const characterToCreate = res.locals.character;
    console.log(`res.locals.character in createCharacter: ${res.locals.character}`)
    try {
        await dbconnect();
        
        result = await charactersCOL.insertOne(characterToCreate);
        let characterCreated = await charactersCOL.findOne({_id: ObjectId(result.insertedId)});
        
        await dbclose()

        result.acknowledged ? res.status(201).json(characterCreated) : res.status(500).json({"error": "the data core is overheated. try again later."})
    } catch(err) {
        console.error(`Error occured when trying createCharacter.
        Error: ${err}`);
        return res.status(500).json({"error": "the TARDIS data core is not responding. try again later."});
    }
}

const deleteCharacter = async (req, res) => {
    const {id} = req.params;

    try {
        await dbconnect();

        let deleteResult = await charactersCOL.deleteOne({ _id: ObjectId(id) });

        await dbclose();

        deleteResult.deletedCount === 1
            ? res.status(204).send()
            : res.status(500).json({
                "error": "could not delete the character now. try again later.",
            });

    } catch(err) {
        console.error(`Error when trying deleteCharacter.
        Error: ${err}`);
        res.status(500).json({"error": "the TARDIS data core is not responding. try again later."});
    }
}

module.exports = {
    getAll,
    getById,
    updateCharacter,
    createCharacter,
    deleteCharacter
}