const express = require('express');
const router=express.Router();
const Category = require("../app/controller/Category.controller")
const { validate } = require("../app/controller/ValidateCategory");



router.get("/",Category.view)
router.get("/add",Category.add)
router.get("/view/:id",Category.list)
router.post("/add",validate.validateCategory(),Category.newCategory)
router.get("/edit/:id",Category.edit);
router.post("/edit/:id",validate.validateCategoryEdit(),Category.editConfirm)
router.get("/delete/:id",Category.delete)
module.exports=router