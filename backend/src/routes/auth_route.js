const express = require("express");
const router = express.Router();
const { createUser, logIn } = require("../controllers/auth_controller");

router.post("/signup", createUser);
router.post("/login", logIn);

module.exports = router;
