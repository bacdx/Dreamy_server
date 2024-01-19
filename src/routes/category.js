const express = require('express');
const router=express.Router();
const Category = require("../app/controller/Category.controller")
const { validate } = require("../app/controller/ValidateCategory");
const checklogin = require("../app/controller/Middleware.controller");


router.get("/",checklogin,Category.view)
router.get("/add",checklogin,Category.add)
router.get("/view/:id",checklogin,Category.list)
router.post("/add",checklogin,validate.validateCategory(),Category.newCategory)
router.get("/edit/:id",checklogin,Category.edit);
router.post("/edit/:id",checklogin,validate.validateCategoryEdit(),Category.editConfirm)
router.get("/delete/:id",checklogin,Category.delete)
module.exports=router