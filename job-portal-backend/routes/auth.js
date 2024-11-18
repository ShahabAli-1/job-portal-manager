const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

// Get Authenticated User
router.get("/user", auth, authController.getUser);

module.exports = router;
