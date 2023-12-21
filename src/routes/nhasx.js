const express = require('express');
const router=express.Router();
const nhaSanXuat = require("../app/controller/NhaSanXuat.controller")

router.get("/",nhaSanXuat.view)
router.get("/add",nhaSanXuat.add)
router.post("/add",nhaSanXuat.newCategory)
router.get("/edit/:id",nhaSanXuat.edit);
router.post("/editfirm/:id",nhaSanXuat.editConfirm)
router.get("/delete/:id",nhaSanXuat.delete)
module.exports=router ;