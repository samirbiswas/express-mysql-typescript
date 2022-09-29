import express from 'express';
const router = express.Router();
const authenticate = require("../Middlewares/authenticate")
const store = require("../Controllers/Product/store")
const update = require("../Controllers/Product/update")


router.post("/product", authenticate, store)
router.get("/")
router.put("/product/:id", authenticate, update)
router.delete("/")

module.exports = router