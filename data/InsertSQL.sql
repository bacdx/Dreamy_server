
use dreamy;


INSERT INTO loai_san_pham (ten, note) VALUES
('Quần áo nam', 'Các loại quần áo nam cao cấp'),
('Quần áo nữ', 'Các loại quần áo nữ cao cấp'),
('Trang phục thời trang', 'Các loại trang phục thời trang cao cấp');
 
 INSERT INTO nhanvien (numberphone, hoten, username, matkhau)
 VALUES (1234567890, 'Nguyen Van A', 'nguyenvana', 123456)
 ,(1234567111, 'Nguyen Van B', 'nguyenvanb', 123456789);
 select* from nhanvien;
insert into  nha_san_xuat  (name ,numberphone,address) 
value( 'Luxry' , '+1121567890', '12 Hai Bà Trưng , Hà Nội'),
( 'Baby' , '+112134390', 'C6 Thanh Xuân , Hà Nội');
select* from nha_san_xuat;


INSERT INTO san_pham (ten, manhasanxuat, maloai, ngaynhap, ghichu, gia) VALUES
('Áo sơ mi nam Lacoste', 1, 1, '2023-11-02 09:26:57', 'Áo sơ mi nam cao cấp', 2000000),
('Quần jean nam Levis', 2, 1, '2023-11-02 09:26:57', 'Quần jean nam cao cấp', 1500000),
('Áo thun nam Polo Ralph Lauren', 3, 1, '2023-11-02 09:26:57', 'Áo thun nam cao cấp', 1000000),
('Đầm xòe nữ Zara', 4, 2, '2023-11-02 09:26:57', 'Đầm xòe nữ cao cấp', 3000000),
('Chân váy ngắn nữ Mango', 5, 2, '2023-11-02 09:26:57', 'Chân váy ngắn nữ cao cấp', 2000000),
('Áo sơ mi nữ công sở Uniqlo', 6, 2, '2023-11-02 09:26:57', 'Áo sơ mi nữ công sở cao cấp', 1500000),
('Quần tây nữ công sở Massimo Dutti', 7, 2, '2023-11-02 09:26:57', 'Quần tây nữ công sở cao cấp', 1000000),
('Áo khoác da nam Zara', 8, 3, '2023-11-02 09:26:57', 'Áo khoác da nam cao cấp', 5000000),
('Áo khoác bomber nữ Mango', 9, 3, '2023-11-02 09:26:57', 'Áo khoác bomber nữ cao cấp', 4000000);
 
 INSERT INTO anh_san_pham (masanpham, img) VALUES
(1, 'https://example.com/images/product1.jpg'),
(2, 'https://example.com/images/product2.jpg'),
(3, 'https://example.com/images/product3.jpg');

 select* from san_pham ;
 INSERT INTO size (masp, title) VALUES
(1, 'S'),
(1, 'M'),
(1, 'L'),
(1, 'XL'),
(1, 'XXL'),
(2, 'S'),
(2, 'M'),
(2, 'L'),
(2, 'XL'),
(2, 'XXL'),
(3, 'S'),
(3, 'M'),
(3, 'L'),
(3, 'XL'),
(3, 'XXL'),
(4, 'S'),
(4, 'M'),
(4, 'L'),
(4, 'XL'),
(4, 'XXL'),
(5, 'S'),
(5, 'M'),
(5, 'L'),
(5, 'XL'),
(5, 'XXL');
 
 INSERT INTO quyen (tenquyen, manhanvien)
 VALUES ('Quyền 1', 1);
 
 INSERT INTO notificaton (batdau, ketthuc, mathongbao) 
 VALUES ('2023-10-05 08:00:00', '2023-10-05 16:00:00', 1)
 ,('2023-10-05 09:00:00', '2023-10-05 18:00:00', 2);
  select* from notificaton;
  INSERT INTO loai_thong_bao (notificatonname)
 VALUES ('Thông báo 1')
 ,('Thông báo 2');
 

 
INSERT INTO binh_luan (makhachhang, content, thoigian, masanpham) VALUES
(1, 'Sản phẩm này rất tốt', '2023-11-02 09:26:57', 1),
(2, 'Tôi rất hài lòng với sản phẩm này', '2023-11-02 09:26:57', 2),
(3, 'Sản phẩm này giao rất nhanh', '2023-11-02 09:26:57', 3),
(4, 'Tôi sẽ mua lại sản phẩm này', '2023-11-02 09:26:57', 4);
select* from binh_luan;

INSERT INTO media_comment (macomment, content) VALUES
(1, 'https://example.com/media/comment1.jpg'),
(2, 'https://example.com/media/comment2.mp4'),
(3, 'https://example.com/media/comment3.pdf'),
(4, 'This is a text comment');
 

 


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

INSERT INTO hoa_don_khach_hang (thoigian, tongtien, trangthai, mavandon, makhachhang) VALUES
('2023-11-02 09:26:57', 1000000, 1, 1, 1),
('2023-11-02 09:26:57', 2000000, 2, 2, 2),
('2023-11-02 09:26:57', 3000000, 3, 3, 3);

INSERT INTO chi_tiet_hoa_don (mahoadon, masanpham, soluong, dongia) VALUES
(1, 1, 1, 1000000),
(1, 2, 1, 2000000),
(2, 1, 2, 1000000),
(2, 3, 1, 3000000);
INSERT INTO color (masp, title, mamau, img) VALUES
(1, 'Đen', '#000000', 'https://cdn.tgdd.vn/Products/Images/432278/iphone-14-pro-max-2023-1653452036.jpg'),
(2, 'Trắng', '#ffffff', 'https://cdn.tgdd.vn/Products/Images/432278/iphone-14-pro-max-2023-1653452036.jpg'),
(3, 'Bạc', '#c0c0c0', 'https://cdn.tgdd.vn/Products/Images/432279/macbook-pro-16-inch-2023-1653452036.jpg'),
(4, 'Xám', '#808080', 'https://cdn.tgdd.vn/Products/Images/432279/macbook-pro-16-inch-2023-1653452036.jpg');


INSERT INTO hoa_don_nhap( manhanvien, manhasanxuat, ngay,tongtien)
VALUES (1, 2,"2020-12-12 12:00:00",0),
(1, 2,"2020-12-12 12:00:00",0),
(2, 1,"2020-12-12 12:00:00",0),
(2, 2,"2020-12-12 12:00:00",0);



INSERT INTO chi_tiet_nhap (masanpham, soluong, dongia, ghichu, mahoadon) VALUES
(1, 10, 1000000, 'Nhập hàng mới', 1),
(2, 20, 2000000, 'Nhập hàng mới', 2),
(3, 30, 3000000, 'Nhập hàng mới', 3)

