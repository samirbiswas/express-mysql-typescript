import express from 'express';
const router = express.Router();
const { register, login, getUser } = require("../Controllers/auth.controller");
const  {authenticate}  = require("../Middleware/authenticate");

router.post('/register', register);
router.post('/login', login);

router.get('/all',authenticate, getUser);

export = router