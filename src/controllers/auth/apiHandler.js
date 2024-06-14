import express from "express"
const router =express.Router();

import register from "./register.js"
router.use("/register",register);

import login from "./login.js"
router.use("/login",login);

export default router;