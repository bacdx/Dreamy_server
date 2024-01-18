const express = require('express');
const router=express.Router();
const ApiController=require("../app/controller/ApiController")

// const CreateOrder=require("../app/controller/CreateOrder");
router.get("/loaisanphams",ApiController.getLoaiSanPham) //  http://localhost:3000/api/loaisanphams?ma_loai=2
router.get("/sanphams",ApiController.getSanPhams) //  http://localhost:3000/api/sanphams?ma_loai=1 or http://localhost:3000 http://localhost:3000/api/sanphams?manhasanxuat=1
router.get("/img",ApiController.getImgSanPham) //  http://localhost:3000/api/img?masanpham=1
router.get("/sanpham",ApiController.getSanPham); //  http://localhost:3000/api/sanpham?id=1
router.get("/sanpham1",ApiController.getSanPham1); //  http://localhost:3000/api/sanpham1?id=1
router.get("/sanpham2",ApiController.getSanPham2); //  http://localhost:3000/api/sanpham2?id=1
router.get("/search",ApiController.getSearch); //  http://localhost:3000/api/search
router.get("/chitietsanpham",ApiController.getChitietSanPham); //  http://localhost:3000/api/chitietsanpham?masanpham=1
router.post("/chitietsanpham1",ApiController.getChitietSanPham1); //  http://localhost:3000/api/chitietsanpham1
router.get("/colors",ApiController.getColorbyMaSanPham)// can truyen ma sp vd http://localhost:3000/api/colors?masp=1
router.get("/sizes",ApiController.getSizeByMaSanPham)// can truyen ma sp vd http://localhost:3000/api/sizes?masp=7
router.get("/comments",ApiController.getCommentsByMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=1
router.get("/medias",ApiController.getContentsByMaBinhLuan) // can truyen masp vd http://localhost:3000/api/medias?mabinhluan=3
router.get("/donhangs",ApiController.getDonHangbyIdAccount)//  can truyen masp vd http://localhost:3000/api/donhangs?makhachhang=1
router.get("/chitietdons",ApiController.getChiTietHoaDonKhachHang2) //  vd http://localhost:3000/api/chitietdons?mahoadon=1
router.get("/top",ApiController.Top) // vd http://localhost:3000/api/top
router.get("/favorite",ApiController.Favorite) //  vd http://localhost:3000/api/favorite?makhachhang=1
router.get("/huydon",ApiController.huyDon);         //    http://localhost:3000/api/huydon?id=20


// router.get("/:id",ApiController.getLoaiSanPham)

//post
router.post("/comments",ApiController.getCommentsByMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=7
router.post("/postcomment",ApiController.PostCommentMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=7
router.post("/danhgia",ApiController.PostDanhGiaMaSanPham)// can truyen masp vd http://localhost:3000/api/comments?masanpham=7

router.post("/medias",ApiController.getContentsByMaBinhLuan) // can truyen masp vd http://localhost:3000/api/medias?mabinhluan=3
router.post("/signin",ApiController.Signin); 
router.post("/update",ApiController.UpdateAccount); 
router.post("/login",ApiController.Login); 
router.post("/pay",ApiController.pay);   //http://localhost:3000/api/pay?statusCode=1&id=14
router.post("/order",ApiController.createOrder);
router.post("/nhanvienhuydon",ApiController.huyDonnv);
router.post("/changefavorite",ApiController.changeFav);
                       

module.exports=router;