const express = require('express');
const router=express.Router();
const OderController = require("../app/controller/Oder.controller")

router.get("/",OderController.view)
router.get("/confirm/:id",OderController.confirm)
router.get("/cancel/:id",OderController.cancel)
module.exports=router ;