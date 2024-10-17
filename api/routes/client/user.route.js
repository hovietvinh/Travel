const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user.controller")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register",controller.register) 
router.post("/login",controller.login) 
router.get("/profile",controller.profile) 
router.post("/logout",controller.logout) 
router.post("/upload-by-link",controller.uploadByLink) 
router.post("/upload-by-files",upload.array('photos',10),controller.uploadByFiles) 

module.exports = router