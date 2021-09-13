const { speciesCOL, ObjectId, dbconnect, dbclose } = require('../database/database')

const checkID = async (req, res, next) => {    
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        res.status(400).json({ "error": "this is not a valid id to the TARDIS data core. try again." });
    return;
    }

    try {
        await dbconnect();
        const specieFound = await speciesCOL.findOne({_id: ObjectId(id)});
        await dbclose();
        if (!specieFound){
            return res.status(404).json({"error": "no data found on TARDIS data core with this ID. try again"});
        }
        res.specie = specieFound
    } catch(err) {
        console.error(`Error on checkID middleware. 
        Error: ${err}`);
        return res.status(500).send({"error": "the safety precaution system prevented the TARDIS to materialize inside a stone. please, try again."});
    }

    next();
};

const checkEmptyInput = (req, res, next) => {
    const specieCreate = req.body;
    
    if (!specieCreate || !specieCreate.name || !specieCreate.planet || !specieCreate.firstMentioned || !specieCreate.firstAppearance || !specieCreate.lastAppearance || !specieCreate.allAppearances || !specieCreate.bio || !specieCreate.biologicalType ||!specieCreate.tardisDataCoreURI || !specieCreate.imgURI) {
        res.status(400).json({error: `all fields are required to save a new object to TARDIS data core! refer to documentation.`});
        return;
    }

    next();
}

const sanitizeInput = async (req, res, next) => {
    const incomingObject = req.body;
    const sanitizedObject = {
        'name': incomingObject.name,
        'planet': incomingObject.planet,
        'firstMentioned': incomingObject.firstMentioned,
        'firstAppearance': incomingObject.firstAppearance,
        'lastAppearance': incomingObject.lastAppearance,
        'allAppearances': incomingObject.allAppearances,
        'bio': incomingObject.bio,
        'biologicalType': incomingObject.biologicalType,
        'tardisDataCoreURI': incomingObject.tardisDataCoreURI,
        'imgURI': incomingObject.imgURI  
    }

    res.locals.specie = sanitizedObject;
    console.log(`res.locals.specie in sanitizeInput: ${res.locals.specie}`)

    next();
}

module.exports = {
    checkID,
    checkEmptyInput,
    sanitizeInput
}