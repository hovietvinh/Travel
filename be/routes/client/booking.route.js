const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/booking.controller")
const middlewares = require("../../middlewares/checkUser")



router.post("/",middlewares.checkUser,controller.booking) 
router.get("/",middlewares.checkUser,controller.index) 




module.exports = router