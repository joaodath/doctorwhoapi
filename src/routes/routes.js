const router = require("express").Router();

const CharacterController = require("../controllers/CharacterController");
const CharacterMiddleware = require("../middlewares/CharacterMiddlewares");

router.get("/characters", CharacterController.getAll);

router.get("/characters/:id", CharacterMiddleware.checkID, CharacterController.getById);

router.post("/characters", CharacterMiddleware.checkEmptyInput, CharacterMiddleware.sanitizeInput, CharacterController.createCharacter);

router.put("/characters/:id", CharacterMiddleware.checkID, CharacterController.updateCharacter);

router.delete("/characters/:id", CharacterMiddleware.checkID, CharacterController.deleteCharacter)

module.exports = router;