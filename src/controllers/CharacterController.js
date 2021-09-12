const { client, charactersCOL, dbconnect, dbclose, ObjectId } = require('../database/database')

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

    try {
        await dbconnect()
        
        await charactersCOL.findOneAndUpdate({_id: ObjectId(id)}, characterPut);

        const characterUpdated = await charactersCOL.findOne({_id: ObjectId(id)});
        await dbclose();

        return res.json(characterUpdated);
    } catch(err) {
        console.error(`Error when doing updateCharacter. Error: ${err}`);
        return res.status(500).send({"error": "it appears the TARDIS has no energy now and entered safe mode. try again later."});
    }
}

const createCharacter = async (req, res) => {
    const characterToCreate = req.body;
    try{
        await dbconnect();
        result = await charactersCOL.insertOne(characterToCreate);
        let characterCreated = await charactersCOL.findOne({_id: ObjectId(result.insertedId)});

        await dbclose()
    } catch(err) {
        console.error(`Error occured when trying createCharacter`);
        return res.status(500).json({"error": "the TARDIS data core is not responding. try again later."});
    }
}

module.exports = {
    getAll,
    getById,
    updateCharacter,
    createCharacter
}