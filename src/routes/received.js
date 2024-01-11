const express = require('express');
const router=express.Router();
const receivedController=require("../app/controller/ReceivedController");

router.get("/",receivedController.index)
router.post("/",receivedController.index)
module.exports=router