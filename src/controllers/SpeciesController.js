const { speciesCOL, dbconnect, dbclose, ObjectId } = require('../database/database')

const getAll = async (req, res) => {
    try {
        await dbconnect();
        let species = speciesCOL.find({});
        let speciesArr = await species.toArray();
        await dbclose();
        return res.json(speciesArr);
    } catch(err) {
        console.log(`Error when doing getAll. Error: ${err}`)
        return res.status(500).send({"error": "it seems the TARDIS telepathic circuits are overloaded right now. try again later."});
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    
    try {
        await dbconnect();
        const specieFound = await speciesCOL.findOne({_id: ObjectId(id)});
        await dbclose();

        if (!specieFound) {
            return res.status(404).json({"error": "specie not found inside the TARDIS data core."});
        } else {
            return res.send(specieFound);
        };

    } catch(err) {
        console.error(`Error when doing getById_Specie. 
        Error: ${err}`);
        return res.status(500).send({"error": "it seems the TARDIS is running empty on fuel. we'll recharge over Cardiff's rift. try again later."});
    }
}

const updateSpecie = async (req, res) => {
    const { id } = req.params;
    const speciePut = req.body;

    try {
        await dbconnect()

        const filterQuery = {_id: ObjectId(id)};
        const updateObject = { $set: speciePut };
        const updateOptions = { upsert: true }
       
        const specieUpdating = await speciesCOL.findOneAndUpdate(filterQuery, updateObject, updateOptions);

        const specieUpdated = await speciesCOL.findOne(filterQuery);

        await dbclose();

        specieUpdating.lastErrorObject.updatedExisting ? res.json(specieUpdated) : res.status(500).json({"error": "failed to update object. TARDIS data core overheated. try again later."});

        if (specieUpdating.lastErrorObject.updatedExisting) {
            res.json(specieUpdated)
        } else if (!specieUpdating.lastErrorObject.updatedExisting && specieUpdating.value) {
            res.status(201).json(specieUpdated)
        }

    } catch(err) {
        console.error(`Error when doing updateSpecie. Error: ${err}`);
        return res.status(500).send({"error": "it appears the TARDIS has no energy now and entered safe mode. try again later."});
    }
}

const createSpecie = async (req, res) => {
    const specieToCreate = res.locals.specie;
    console.log(`res.locals.specie in createSpecie: ${res.locals.specie}`)
    try {
        await dbconnect();
        
        result = await speciesCOL.insertOne(specieToCreate);
        let specieCreated = await speciesCOL.findOne({_id: ObjectId(result.insertedId)});
        
        await dbclose()

        result.acknowledged ? res.status(201).json(specieCreated) : res.status(500).json({"error": "the data core is overheated. try again later."})
    } catch(err) {
        console.error(`Error occured when trying createSpecie.
        Error: ${err}`);
        return res.status(500).json({"error": "the TARDIS data core is not responding. try again later."});
    }
}

const deleteSpecie = async (req, res) => {
    const {id} = req.params;

    try {
        await dbconnect();

        let deleteResult = await speciesCOL.deleteOne({ _id: ObjectId(id) });

        await dbclose();

        deleteResult.deletedCount === 1
            ? res.status(204).send()
            : res.status(500).json({
                "error": "could not delete the specie now. try again later.",
            });

    } catch(err) {
        console.error(`Error when trying deleteSpecie.
        Error: ${err}`);
        res.status(500).json({"error": "the TARDIS data core is not responding. try again later."});
    }
}

module.exports = {
    getAll,
    getById,
    updateSpecie,
    createSpecie,
    deleteSpecie
}