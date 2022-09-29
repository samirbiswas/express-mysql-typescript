import express from 'express'
const router = express.Router()
const login = require("../Controllers/Auth/login")
const signup = require("../Controllers/Auth/signup")

router.post("/signup", signup);
router.post("/login", login);

module.exports = router