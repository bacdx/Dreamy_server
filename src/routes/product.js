const express = require('express');
const router=express.Router();
const productController=require("../app/controller/ProductController")

router.get("/",productController.index)
router.post("/",productController.index)
module.exports=router