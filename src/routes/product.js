const express = require('express');
const router=express.Router();
const productController=require("../app/controller/ProductController")
const { validate } = require("../app/controller/ValidateProduct");
const checklogin = require("../app/controller/Middleware.controller");


router.get("/",checklogin,productController.view)
router.get("/view/:id",checklogin,productController.viewAllPro)
router.post("/addproduct",checklogin,validate.validateProduct(),productController.addPro)
router.post("/addimg",checklogin,validate.validateProductImg(),productController.addimg)
router.get("/addproduct",checklogin,productController.form)
router.get("/edit/:id",checklogin,productController.edit)
router.post("/editproduct/:id",checklogin,validate.validateProduct(),productController.editfirm)
router.get("/delete/:id",checklogin,productController.delete)
router.get("/editImg/:id",checklogin,productController.editImg)
router.get("/editImgFirm/:id",checklogin,productController.editImgfirm)
router.post("/addSizes",checklogin,validate.validateProductSize(),productController.addSizes)
router.post("/addColors",checklogin,validate.validateProductColor(),productController.addColors)
router.post("/editImg/:id",checklogin,validate.validateProductImg(),productController.editFormImg)
// biến thể 
router.get("/variant/:id",checklogin,productController.variant)
router.get("/addVariant/:id",checklogin,productController.addVariant)
router.get("/editVariant/:id",checklogin,productController.viewEditVariant)
router.post("/addVariant",checklogin,validate.validateProductVariant(),productController.addVariantForm)
router.post("/editVariant/:id",checklogin,validate.validateProductVariant(),productController.editVariant)
router.get("/deleteVariant/:id",checklogin,productController.deleteVariant);
// color 
router.get("/editColor/:id",checklogin,productController.color)
router.get("/editColorFirm/:id",checklogin,productController.editColor)
router.get("/addColor/:id",checklogin,productController.addColor)
router.post("/addColor",checklogin,validate.validateProductColor(),productController.formColor)
router.post("/editColor/:id",checklogin,validate.validateProductColor(),productController.editcolorFirm)
router.get("/deleteColor/:id",checklogin,productController.deleteColor)
// SIZE
router.get("/editSize/:id",checklogin,productController.size)
router.get("/addSize/:id",checklogin,productController.addSize)
router.post("/addSize",checklogin,validate.validateProductSize(),productController.formSize)
router.get("/editSizeFirm/:id",checklogin,productController.editSize)
router.post("/editSize/:id",checklogin,validate.validateProductSize(),productController.editSizeFirm)
router.get("/deleteSize/:id",checklogin,productController.deleteSize)

// binhluan
router.get("/deletebl/:id",checklogin,productController.deletebl)

module.exports=router