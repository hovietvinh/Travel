const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/place.controller")
const middlewares = require("../../middlewares/checkUser")

router.post("/add",middlewares.checkUser,controller.add) 
router.get("/:id",middlewares.checkUser,controller.findById) 
router.get("/",middlewares.checkUser,controller.index) 
router.patch("/update/:id",middlewares.checkUser,controller.update) 



module.exports = router