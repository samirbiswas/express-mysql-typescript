import express from 'express';
const router = express.Router();
const store = require('../Controllers/Order/store')

router.post("/api/order", store)

module.exports = router