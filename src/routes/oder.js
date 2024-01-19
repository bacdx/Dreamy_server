const express = require('express');
const router=express.Router();
const OderController = require("../app/controller/Oder.controller")
const checklogin = require("../app/controller/Middleware.controller");
router.get("/",checklogin,OderController.view)
router.get("/confirm",checklogin,OderController.viewConfirm)
router.get("/cancel",checklogin,OderController.viewCancel)
router.get("/delivered",checklogin,OderController.viewDelivered)
router.get("/delivering",checklogin,OderController.viewDelivering)
router.get("/delivering/:id",checklogin,OderController.confirmDelivering)
router.get("/done/:id",checklogin,OderController.done)
router.get("/view/:id",checklogin,OderController.detailOder)
router.get("/confirm/:id",checklogin,OderController.confirm)
router.get("/cancel/:id",checklogin,OderController.cancel)
module.exports=router ;