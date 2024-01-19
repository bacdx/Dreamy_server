const express = require('express');
const router=express.Router();
const doanhthu = require("../app/controller/DoanhThu.controller")
const checklogin = require("../app/controller/Middleware.controller");
router.get("/",checklogin,doanhthu.view)

router.post("/",checklogin,doanhthu.doanhthu)
module.exports=router ;