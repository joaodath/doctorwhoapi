const router = require("express").Router();

const CharacterController = require("../controllers/CharacterController");
const CharacterMiddleware = require("../middlewares/CharacterMiddlewares");

router.get("/characters", CharacterController.getAll);
router.get("/characters/:id", CharacterMiddleware.checkID, CharacterController.getById);

module.exports = router;