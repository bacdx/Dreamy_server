const express = require('express');
const router=express.Router();
const productController=require("../app/controller/ProductController")
const { validate } = require("../app/controller/ValidateProduct");


router.get("/",productController.view)
router.get("/view/:id",productController.viewAllPro)
router.post("/addproduct",validate.validateProduct(),productController.addPro)
router.post("/addimg",validate.validateProductImg(),productController.addimg)
router.get("/addproduct",productController.form)
router.get("/edit/:id",productController.edit)
router.post("/editproduct/:id",validate.validateProduct(),productController.editfirm)
router.get("/delete/:id",productController.delete)
router.get("/editImg/:id",productController.editImg)
router.get("/editImgFirm/:id",productController.editImgfirm)
router.post("/addSizes",validate.validateProductSize(),productController.addSizes)
router.post("/addColors",validate.validateProductColor(),productController.addColors)
router.post("/editImg/:id",validate.validateProductImg(),productController.editFormImg)
// biến thể 
router.get("/variant/:id",productController.variant)
router.get("/addVariant/:id",productController.addVariant)
router.get("/editVariant/:id",productController.viewEditVariant)
router.post("/addVariant",validate.validateProductVariant(),productController.addVariantForm)
router.post("/editVariant/:id",validate.validateProductVariant(),productController.editVariant)
router.get("/deleteVariant/:id",productController.deleteVariant);
// color 
router.get("/editColor/:id",productController.color)
router.get("/editColorFirm/:id",productController.editColor)
router.get("/addColor/:id",productController.addColor)
router.post("/addColor",validate.validateProductColor(),productController.formColor)
router.post("/editColor/:id",validate.validateProductColor(),productController.editcolorFirm)
router.get("/deleteColor/:id",productController.deleteColor)
// SIZE
router.get("/editSize/:id",productController.size)
router.get("/addSize/:id",productController.addSize)
router.post("/addSize",validate.validateProductSize(),productController.formSize)
router.get("/editSizeFirm/:id",productController.editSize)
router.post("/editSize/:id",validate.validateProductSize(),productController.editSizeFirm)
router.get("/deleteSize/:id",productController.deleteSize)
// binhluan
router.get("/deletebl/:id",productController.deletebl)
module.exports=router