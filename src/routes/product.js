const express = require('express');
const router=express.Router();
const productController=require("../app/controller/ProductController")

router.get("/",productController.view)
router.post("/addproduct",productController.addPro)
router.post("/addimg",productController.addimg)
router.get("/addproduct",productController.form)
router.get("/edit/:id",productController.edit)
router.post("/editproduct/:id",productController.editfirm)
router.get("/delete/:id",productController.delete)
// color 
router.get("/editColor/:id",productController.color)
router.get("/editColorFirm/:id",productController.editColor)
router.get("/addColor/:id",productController.addColor)
router.post("/addColor",productController.formColor)
router.post("/editColor/:id",productController.editcolorFirm)
router.get("/deleteColor/:id",productController.deleteColor)
module.exports=router