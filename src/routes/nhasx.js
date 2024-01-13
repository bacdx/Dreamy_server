const express = require('express');
const router=express.Router();
const nhaSanXuat = require("../app/controller/NhaSanXuat.controller")
const { validate } = require("../app/controller/ValidateNSX");
router.get("/",nhaSanXuat.view)
router.get("/add",nhaSanXuat.add)
router.get("/view/:id",nhaSanXuat.list)
router.post("/add",validate.validateNSX(),nhaSanXuat.newCategory)
router.get("/edit/:id",nhaSanXuat.edit);
router.post("/editfirm/:id",validate.validateNSX(),nhaSanXuat.editConfirm)
router.get("/delete/:id",nhaSanXuat.delete)
module.exports=router ;