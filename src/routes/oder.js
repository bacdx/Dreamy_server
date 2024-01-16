const express = require('express');
const router=express.Router();
const OderController = require("../app/controller/Oder.controller")

router.get("/",OderController.view)
router.get("/confirm",OderController.viewConfirm)
router.get("/cancel",OderController.viewCancel)
router.get("/delivered",OderController.viewDelivered)
router.get("/delivering",OderController.viewDelivering)
router.get("/delivering/:id",OderController.confirmDelivering)
router.get("/view/:id",OderController.detailOder)
router.get("/confirm/:id",OderController.confirm)
router.get("/cancel/:id",OderController.cancel)
module.exports=router ;