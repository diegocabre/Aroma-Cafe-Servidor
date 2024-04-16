const router = require("express").Router();
const { verifyToken } = require("../../middleware/checkLogin/index.js");
const {
  privateHandler,
} = require("../../controllers/LoginController/index.js");

// Ruta protegida para la página privada
router.get("/", verifyToken, privateHandler);

module.exports = router;
