
use dreamy;


INSERT INTO loai_san_pham (id,ten, note,img) VALUES
(1,'Quần áo nam', 'Các loại quần áo nam cao cấp','https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(2,'Quần áo nữ', 'Các loại quần áo nữ cao cấp','https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(3,'Trang phục thời trang', 'Các loại trang phục thời trang cao cấp','https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg');
 
 INSERT INTO nhanvien (id,numberphone, hoten, username, matkhau)
 VALUES (1,1234567890, 'Nguyen Van A', 'nguyenvana', 123456)
 ,(2,1234567111, 'Nguyen Van B', 'nguyenvanb', 123456789);
 select* from nhanvien;
 SHOW VARIABLES LIKE 'max_allowed_packet';
INSERT INTO nha_san_xuat (id,name, numberphone, address) VALUES
( 1,'Nike', '+1121567890', '123 Nguyễn Du, Hà Nội'),
( 2,'Adidas', '+112134390', '456 Lê Lợi, Hà Nội'),
( 3,'Puma', '+1121789012', '789 Trần Hưng Đạo, Hà Nội'),
( 4,'Gucci', '+1121901234', '101 Hồ Gươm, Hà Nội'),
( 5,'Louis Vuitton', '+1121456789', '202 Lý Thường Kiệt, Hà Nội');
select* from nha_san_xuat;

INSERT INTO san_pham (id,ten, manhasanxuat, maloai, ngaynhap, ghichu, gia,khuyenmai) VALUES
(1,'Áo sơ mi nam Lacoste', 1, 1, '2023-11-02 09:26:57', 'Áo sơ mi nam cao cấp', 2000000,20),
(2,'Quần jean nam Levis', 2, 1, '2023-11-02 09:26:57', 'Quần jean nam cao cấp', 1500000,30),
(3,'Áo thun nam Polo Ralph Lauren', 3, 1, '2023-11-02 09:26:57', 'Áo thun nam cao cấp', 1000000,10),
(4,'Đầm xòe nữ Zara', 4, 2, '2023-11-02 09:26:57', 'Đầm xòe nữ cao cấp', 3000000,0),
(5,'Chân váy ngắn nữ Mango', 5, 2, '2023-11-02 09:26:57', 'Chân váy ngắn nữ cao cấp', 2000000,0),
(6,'Áo sơ mi nữ công sở Uniqlo', 5, 2, '2023-11-02 09:26:57', 'Áo sơ mi nữ công sở cao cấp', 1500000,0),
(7,'Quần tây nữ công sở Massimo Dutti', 5, 2, '2023-11-02 09:26:57', 'Quần tây nữ công sở cao cấp', 1000000,0),
(8,'Áo khoác da nam Zara', 5, 3, '2023-11-02 09:26:57', 'Áo khoác da nam cao cấp', 5000000,50),
(9,'Áo khoác bomber nữ Mango', 4, 3, '2023-11-02 09:26:57', 'Áo khoác bomber nữ cao cấp', 4000000,50);


 INSERT INTO anh_san_pham (masanpham, img) VALUES
(1, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(1, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(1, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(1, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(3, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg'),
(2, 'https://dony.vn/wp-content/uploads/2022/03/decor-goc-chup-anh-cho-shop-quan-ao-1.jpg');
select * from san_pham as s inner join nha_san_xuat as n   on s.manhasanxuat=n.id inner join anh_san_pham as a on a.masanpham=s.id where s.id =1  limit 20;
 select* from khachhang ;
 
 INSERT INTO color (id,masp, title, img) VALUES
(1,1, 'sám', 'https://down-vn.img.susercontent.com/file/bf281a731e7058cc3a4f19e41afae07a'),
(5,1, 'Trắng', 'https://tse4.mm.bing.net/th?id=OIP.Tl94TsfWZ9ZxgoM4dX5QmgAAAA&pid=Api&P=0&h=220'),
(2,2, 'Trắng', 'https://cdn.tgdd.vn/Products/Images/432278/iphone-14-pro-max-2023-1653452036.jpg'),
(3,3, 'Bạc', 'https://cdn.tgdd.vn/Products/Images/432279/macbook-pro-16-inch-2023-1653452036.jpg'),
(4,4, 'Xám',  'https://cdn.tgdd.vn/Products/Images/432279/macbook-pro-16-inch-2023-1653452036.jpg');
 INSERT INTO size (id,masp, title) VALUES
(1,1, 'S'),
(2,1, 'M'),
(3,1, 'L'),
(4,1, 'XL'),
(5,2, 'XXL'),
(6,2, 'S'),
(7,2, 'M'),
(8,2, 'L'),
(9,2, 'XL'),
(10,2, 'XXL'),
(11,3, 'S'),
(12,3, 'M'),
(13,3, 'L'),
(14,3, 'XL'),
(15,3, 'XXL'),
(16,4, 'S'),
(17,4, 'M'),
(18,4, 'L'),
(19,4, 'XL'),
(20,4, 'XXL'),
(21,5, 'S'),
(22,5, 'M'),
(23,5, 'L'),
(24,5, 'XL'),
(25,5, 'XXL');

insert into chi_tiet_san_pham (id,masanpham,mamau,masize,soluong) values
(1,1,1,1,10),
(2,1,5,2,10),
(3,1,1,3,10),
(4,2,5,4,12),
(5,2,1,5,11),
(6,2,2,6,10),
(7,2,2,7,10),
(8,2,2,8,10),
(9,2,2,9,12),
(10,2,2,10,11);

 INSERT INTO quyen (tenquyen, manhanvien)
 VALUES ('Quyền 1', 1);
 
 
 INSERT INTO notificaton (batdau, ketthuc, mathongbao) 
 VALUES ('2023-10-05 08:00:00', '2023-10-05 16:00:00', 1)
 ,('2023-10-05 09:00:00', '2023-10-05 18:00:00', 2);
  select* from notificaton;
  INSERT INTO loai_thong_bao (notificatonname)
 VALUES ('Thông báo 1')
 ,('Thông báo 2');
 

 
INSERT INTO binh_luan (id,makhachhang, content, thoigian, masanpham) VALUES
(1,1, 'Sản phẩm này rất tốt', '2023-11-02 09:26:57', 1),
(2,2, 'Tôi rất hài lòng với sản phẩm này', '2023-11-02 09:26:57', 1),
(3,3, 'Sản phẩm này giao rất nhanh', '2023-11-02 09:26:57', 2),
(4,4, 'Tôi sẽ mua lại sản phẩm này', '2023-11-02 09:26:57', 2);
select* from san_pham;

INSERT INTO media_comment (id,macomment, content) VALUES
(1,1, 'https://example.com/media/comment1.jpg'),
(2,1, 'https://example.com/media/comment2.mp4'),
(3,3, 'https://example.com/media/comment3.pdf'),
(4,4, 'This is a text comment');
 

 


INSERT INTO khuyen_mai (id,khuyenmaiphantram, khuyennmaitien, masanpham, tenkhuyenmai) 
VALUES (1,30,0, 1, 'Khuyến mãi A')
,(2,10,100000, 2, 'Khuyến mãi B');

INSERT INTO khachhang (id, address, numberphone, username, matkhau, hoten,avatar) 
VALUES (1, '123 Đường ABC', '0987654321', 'nguyenvana', '0123456', 'Nguyễn Văn A','D:\\\\data\\\avatar_10.jpg')
,(2, '322 Đường DCD', '0987654123',  'nguyenkimb', '12345', 'Nguyễn Kim B','D:\\\\data\\\avatar_10.jpg');

INSERT INTO hoa_don_nhap (manhanvien, manhasanxuat, ngay, tongtien)
VALUES (1, 1, '2023-10-05 08:00:00', 5000),
(2, 2, '2023-10-05 08:00:00', 5000)
;
select s.id,s.ten,s.manhasanxuat ,ngaynhap,ghichu,gia,img from san_pham as s  left join anh_san_pham as a on s.id = a.masanpham group by s.id ;     
select* from chi_tiet_hoa_don as a inner join hoa_don_khach_hang as h on a.mahoadon=h.id;
INSERT INTO hoa_don_khach_hang (id,thoigian, tongtien, trangthai, mavandon, makhachhang,address) VALUES
(1,'2023-11-02 09:26:57', 1000000, 1, 1, 1,'Quynh Hong, Quynh Phu Thai Binh'),
(2,'2023-11-02 09:26:57', 2000000, 2, 2, 2,'Quynh Hong, Quynh Phu Thai Binh'),
(3,'2023-11-02 09:26:57', 3000000, 3, 3, 2,'Quynh Hong, Quynh Phu Thai Binh'),
(4,'2023-11-02 09:26:57', 1000000, 2, 1, 1,'Quynh Hong, Quynh Phu Thai Binh'),
(5,'2023-11-02 09:26:57', 1000000, 3, 1, 1,'Quynh Hong, Quynh Phu Thai Binh'),
(6,'2023-11-02 09:26:57', 1000000, 2, 1, 1,'Quynh Hong, Quynh Phu Thai Binh');
select * from chi_tiet_hoa_don;
INSERT INTO chi_tiet_hoa_don (id,mahoadon, mactsanpham, soluong, dongia) VALUES
(1,1, 1, 1, 1000000),
(2,1, 2, 1, 2000000),
(3,2,1, 2, 1000000),
(4,2,3, 1, 3000000);

insert into favorite(id, masp,makhachhang)
values(1,1,1),
	(2,2,1),
	(3,3,1),
	(4,1,2),
	(5,2,2),
	(6,3,2);

SELECT s.*,count(f.masp) as count FROM san_pham as s inner join favorite as f on s.id=f.masp group by(f.masp)  ORDER BY favorite DESC LIMIT 10; 


INSERT INTO hoa_don_nhap(id, manhanvien, manhasanxuat, ngay,tongtien)
VALUES (1,1, 2,"2020-12-12 12:00:00",100000),
(2,1, 2,"2020-12-12 12:00:00",0),
(3,2,1,"2020-12-12 12:00:00",0),
(4,2, 2,"2020-12-12 12:00:00",0);
 select top(10) from khachhang;

