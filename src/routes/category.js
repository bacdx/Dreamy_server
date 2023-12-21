const express = require('express');
const router=express.Router();
const Category = require("../app/controller/Category.controller")

router.get("/",Category.view)
router.get("/add",Category.add)
router.post("/add",Category.newCategory)
router.get("/edit/:id",Category.edit);
router.post("/edit/:id",Category.editConfirm)
router.get("/delete/:id",Category.delete)
module.exports=router