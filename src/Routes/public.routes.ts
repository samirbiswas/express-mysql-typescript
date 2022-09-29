import express from 'express';
const router = express.Router();
const list = require("../Controllers/Product/list")

router.get("/", list)

module.exports = router