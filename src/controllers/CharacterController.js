const { client, charactersCOL, dbconnect, dbclose, ObjectId } = require('../database/database')

const getAll = async (req, res) => {
    try {
        dbconnect();
        let characters = charactersCOL.find({});
        let charactersArr = await characters.toArray();
        dbclose();
        return res.json(charactersArr);
    } catch(err) {
        console.log(`Error when doing getAll. Error: ${err}`)
        return res.status(500).send({"error": "it seems the TARDIS telepathic circuits are overloaded right now. try again later."});
    }
}

module.exports = {
    getAll,

}