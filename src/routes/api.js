const express = require('express');
const router=express.Router();
const ApiController=require("../app/controller/ApiController")
router.get("/loaisanphams",ApiController.getLoaiSanPham)
router.get("/sanphams",ApiController.getSanPhams)
router.get("/sanpham",ApiController.getSanPham);
router.get("/colors",ApiController.getColorbyMaSanPham)// can truyen ma sp vd http://localhost:3000/api/colors?masp=8
router.get("/sizes",ApiController.getSizeByMaSanPham)// can truyen ma sp vd http://localhost:3000/api/size?masanpham=7
router.get("/comments",ApiController.getCommentsByMaSanPham)// can truyen ma sp vd http://localhost:3000/api/comments?masp=7
router.get("/hoadonkhachhang",ApiController.getContentsByMaBinhLuan)
router.get("/chitiethoadon")


router.get("/:id",ApiController.getLoaiSanPham)

//post
router.post
module.exports=router;