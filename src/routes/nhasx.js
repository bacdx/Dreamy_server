const express = require('express');
const router=express.Router();
const nhaSanXuat = require("../app/controller/NhaSanXuat.controller")
const { validate } = require("../app/controller/ValidateNSX");
const checklogin = require("../app/controller/Middleware.controller");

router.get("/",checklogin,nhaSanXuat.view)
router.get("/add",checklogin,nhaSanXuat.add)
router.get("/view/:id",checklogin,nhaSanXuat.list)
router.post("/add",checklogin,validate.validateNSX(),nhaSanXuat.newCategory)
router.get("/edit/:id",checklogin,nhaSanXuat.edit);
router.post("/editfirm/:id",checklogin,validate.validateNSX(),nhaSanXuat.editConfirm)
router.get("/delete/:id",checklogin,nhaSanXuat.delete)
module.exports=router ;