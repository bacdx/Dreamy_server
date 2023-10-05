const express = require('express');
const router=express.Router();
const ApiController=require("../app/controller/ApiController")
router.get("/:id",ApiController.getLoaiSanPham)
router.get("/loaisanphams",ApiController.getLoaiSanPham)
router.get("/sanphams",ApiController.getSanPhams)
router.get("/sanpham",ApiController.getSanPham)
router.get("/colors",ApiController.getColorbyMaSanPham)
router.get("/sizes",ApiController.getSizeByMaSanPham)
router.get("/comments",ApiController.getCommentsByMaSanPham)
router.get("/contents",ApiController.getContentsByMaBinhLuan)
module.exports=router;