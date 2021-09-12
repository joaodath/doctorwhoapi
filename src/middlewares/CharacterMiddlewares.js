const { charactersCOL, ObjectId, dbconnect, dbclose } = require('../database/database')

const checkID = async (req, res, next) => {    
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        res.status(400).json({ "error": "this is not a valid id to the TARDIS data core. try again." });
    return;
    }

    try {
        await dbconnect();
        const characterFound = await charactersCOL.findOne({_id: ObjectId(id)});
        await dbclose();
        if (!characterFound){
            return res.status(404).json({"error": "no data found on TARDIS data core with this ID. try again"});
        }
        res.character = characterFound
    } catch(err) {
        console.error(`Error on checkID middleware. 
        Error: ${err}`);
        return res.status(500).send({"error": "the safety precaution system prevented the TARDIS to materialize inside a stone. please, try again."});
    }

    next();
};

module.exports = {
    checkID
}