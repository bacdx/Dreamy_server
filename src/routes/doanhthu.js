const express = require('express');
const router=express.Router();
const doanhthu = require("../app/controller/DoanhThu.controller")

router.get("/",doanhthu.view)
router.post("/",doanhthu.doanhthu)
module.exports=router ;