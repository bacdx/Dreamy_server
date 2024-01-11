Kỳ Đỗ
use dreamy;


 INSERT INTO loai_san_pham (ten, note)
 VALUES ('Mục 1', 'Áo Khoắc')
 ,('Mục 2', 'Áo Dài');
 
 INSERT INTO nhanvien (numberphone, hoten, username, matkhau)
 VALUES (1234567890, 'Nguyen Van A', 'nguyenvana', 123456)
 ,(1234567111, 'Nguyen Van B', 'nguyenvanb', 123456789);
 select* from nhanvien;
insert into  nha_san_xuat  (name ,numberphone,address) 
value( 'Luxry' , '+1121567890', '12 Hai Bà Trưng , Hà Nội'),
( 'Baby' , '+112134390', 'C6 Thanh Xuân , Hà Nội');
select* from nha_san_xuat;


 INSERT INTO san_pham ( ten, manhasanxuat, maloai, ngaynhap, ghichu, gia)
 VALUES ( 'Áo Khoắc lông cừu', 1, 1, '2023-10-05 10:00:00', 'Ghi chú về sản phẩm', 1000000)
 ,( 'Áo dài Bali', 2, 2, '2023-10-05 10:00:00', 'Ghi chú về sản phẩm', 2000000);
 
 select* from san_pham ;
 INSERT INTO size (masp, title)
 VALUES (1, 'L'),
 (1, 'XL')
 ,(2, 'XXL')
 ,(2, 'XL');
 
 INSERT INTO quyen (tenquyen, manhanvien)
 VALUES ('Quyền 1', 1);
 
 INSERT INTO notificaton (batdau, ketthuc, mathongbao) 
 VALUES ('2023-10-05 08:00:00', '2023-10-05 16:00:00', 1)
 ,('2023-10-05 09:00:00', '2023-10-05 18:00:00', 2);
  select* from notificaton;
  INSERT INTO loai_thong_bao (notificatonname)
 VALUES ('Thông báo 1')
 ,('Thông báo 2');
 

 
 INSERT INTO binh_luan (makhachhang, content, thoigian, masanpham)
VALUES (1, 'Nội dung 1', '2023-10-05 08:00:00', 1)
,(2, 'Nội dung 2','2023-10-05 08:00:00', 2);
select* from binh_luan;

 INSERT INTO media_comment (macomment, content)
 VALUES (3, 'Xin Chào')
 ,(3, 'Tạm Biệt'); 
 
 

 


INSERT INTO khuyen_mai (khuyenmaiphantram, khuyennmaitien, masanpham, tenkhuyenmai) 
VALUES (30,0, 1, 'Khuyến mãi A')
,(10,100000, 2, 'Khuyến mãi B');

INSERT INTO khachhang (cccd, address, numberphone, magioitinh, username, matkhau, hoten) 
VALUES ('1234567890', '123 Đường ABC', '0987654321', 'Nam', 'nguyenvana', '0123456', 'Nguyễn Văn A')
,('1234567111', '322 Đường DCD', '0987654123', 'Nữ', 'nguyenkimb', '12345', 'Nguyễn Kim B');

INSERT INTO hoa_don_nhap (manhanvien, manhasanxuat, ngay, tongtien)
VALUES (1, 1, '2023-10-05 08:00:00', 5000),
(2, 2, '2023-10-05 08:00:00', 5000)
;

INSERT INTO hoa_don_khach_hang (thoigian, tongtien, trangthai, mavandon, makhachhang)
VALUES ('2023-10-05 08:00:00', 1, 1, 1001, 1)
,('2023-10-05 09:00:00', 1, 1, 1002, 1);

INSERT INTO chi_tiet_hoa_don (mahoadon, masanpham, soluong, dongia)
VALUES (1, 1, 5, 10000)
,(2, 2, 2, 20000);

INSERT INTO color (masp, title, mamau, img)
VALUES (1, 'Đỏ', '#ff0009', '48656C6C6F20576F726C64')
,(1, 'Xanh', '#9cff0c', '48656C6C6F2057123D12V4'),
(2, 'Đỏ', '#ff0009', '48656C6C6F20576F726C64')
,(2, 'Xanh', '#9cff0c', '48656C6C6F2057123D12V4');


INSERT INTO hoa_don_nhap( manhanvien, manhasanxuat, ngay,tongtien)
VALUES (1, 2,"2020-12-12 12:00:00",0),
(1, 2,"2020-12-12 12:00:00",0),
(2, 1,"2020-12-12 12:00:00",0),
(2, 2,"2020-12-12 12:00:00",0);



INSERT INTO chi_tiet_nhap ( masanpham,dongia, ghichu, mahoadon)
VALUES (1,300000, 'Áo Khoắc lông cừu', 1)
,( 2,2000000, 'Áo Dài Bali', 2);




INSERT INTO media_comment (macomment, content)
VALUES (3,'dsffdssdffsd'),
 (3,'dsffdssdffsd')
;