const express = require('express');
const router=express.Router();
const ApiController=require("../app/controller/ApiController")
router.get("/loaisanphams",ApiController.getLoaiSanPham) //  http://localhost:3000/api/loaisanphams?ma_loai=1
router.get("/sanphams",ApiController.getSanPhams) //  http://localhost:3000/api/sanphams?ma_loai=1
router.get("/img",ApiController.getImgSanPham) //  http://localhost:3000/api/img?masanpham=1
router.get("/sanpham",ApiController.getSanPham); //  http://localhost:3000/api/sanpham
router.get("/colors",ApiController.getColorbyMaSanPham)// can truyen ma sp vd http://localhost:3000/api/colors?masp=1
router.get("/sizes",ApiController.getSizeByMaSanPham)// can truyen ma sp vd http://localhost:3000/api/sizes?masp=7
router.get("/comments",ApiController.getCommentsByMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=8
router.get("/medias",ApiController.getContentsByMaBinhLuan) // can truyen masp vd http://localhost:3000/api/medias?mabinhluan=3
router.get("/donhangs",ApiController.getDonHangbyIdAccount)//  can truyen masp vd http://localhost:3000/api/donhangs?makhachhang=3
router.get("/chitietdons",ApiController.getChiTietHoaDonKhachHang)//  can truyen masp vd http://localhost:3000/api/chitietdons?mahoadon=1


// router.get("/:id",ApiController.getLoaiSanPham)

//post
router.post("/comments",ApiController.getCommentsByMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=7
router.post("/medias",ApiController.getContentsByMaBinhLuan) // can truyen masp vd http://localhost:3000/api/medias?mabinhluan=3
module.exports=router;