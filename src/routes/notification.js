const express = require('express');
const router=express.Router();
const notificationController=require("../app/controller/NotificationController")

router.get("/",notificationController.getlayout)
router.post("/",notificationController.getlayout)
module.exports=router