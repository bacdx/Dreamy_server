const express = require('express');
const router=express.Router();
const productController=require("../app/controller/ProductController")

router.get("/",productController.index) //http://localhost:3000/product
router.post("/",productController.index)
module.exports=router