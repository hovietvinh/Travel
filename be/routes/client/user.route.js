const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user.controller")

router.post("/register",controller.register) 
router.post("/login",controller.login) 
router.get("/profile",controller.profile) 
router.post("/logout",controller.logout) 
router.post("/upload-by-link",controller.uploadByLink) 

module.exports = router