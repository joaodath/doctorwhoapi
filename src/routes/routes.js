const router = require("express").Router();

const CharacterController = require("../controllers/CharacterController");
const CharacterMiddleware = require("../middlewares/CharacterMiddlewares");

const EpisodesController = require("../controllers/EpisodesController");
const EpisodesMiddleware = require("../middlewares/EpisodesMiddlewares");

const SpeciesController = require("../controllers/SpeciesController");
const SpeciesMiddleware = require("../middlewares/SpeciesMiddlewares");

//characters routes
router.get("/characters", CharacterController.getAll);

router.get("/characters/:id", CharacterMiddleware.checkID, CharacterController.getById);

router.post("/characters", CharacterMiddleware.checkEmptyInput, CharacterMiddleware.sanitizeInput, CharacterController.createCharacter);

router.put("/characters/:id", CharacterMiddleware.checkID, CharacterController.updateCharacter);

router.delete("/characters/:id", CharacterMiddleware.checkID, CharacterController.deleteCharacter)

//episodes routes
router.get("/episodes", EpisodesController.getAll)

router.get("/episodes/:id", EpisodesController.getById);

router.post("/episodes", EpisodesMiddleware.checkEmptyInput, EpisodesMiddleware.sanitizeInput, EpisodesController.createEpisode);

router.put("/episodes/:id", EpisodesMiddleware.checkID, EpisodesController.updateEpisode);

router.delete("/episodes/:id", EpisodesMiddleware.checkID, EpisodesController.deleteEpisode);

//species routes
router.get("/species", SpeciesController.getAll)

router.get("/species/:id", SpeciesController.getById);

router.post("/species", SpeciesMiddleware.checkEmptyInput, SpeciesMiddleware.sanitizeInput, SpeciesController.createSpecie);

router.put("/species/:id", SpeciesMiddleware.checkID, SpeciesController.updateSpecie);

router.delete("/species/:id", SpeciesMiddleware.checkID, SpeciesController.deleteSpecie);

module.exports = router;