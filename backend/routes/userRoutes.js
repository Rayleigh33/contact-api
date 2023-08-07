const express = require("express");
const { registerUser, currentUser, loginUser } = require("../controllers/userController");
const validaionCheck = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",validaionCheck,currentUser);

module.exports = router;