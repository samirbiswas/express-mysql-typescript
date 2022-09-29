import express from 'express';
const router = express.Router();

const authRouters = require("./auth.route");
const managerRouters = require("./manager.route");
const customerRouters = require("./customer.route");
const publicRouters = require("./public.routes");

router.use("/auth", authRouters);
router.use("/manager", managerRouters);
router.use("/customer", customerRouters);
router.use("/public", publicRouters);

module.exports = router