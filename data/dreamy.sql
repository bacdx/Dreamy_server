drop database dreamy;


create database dreamy;
use  dreamy;


create table color(
id bigint not null auto_increment primary key,
mact bigint ,
title text,
mamau text,
img blob);

create table size(
id bigint not null auto_increment primary key,
mact bigint ,
title text);

 create table chi_tiet_san_pham(
 id bigint not null auto_increment primary key,
 masp bigint,
 macolor bigint ,
 masize bigint,
 soluong integer
 );
create table media_comment(
id bigint not null auto_increment primary key,
macomment bigint,
content blob);

create table binh_luan(
id bigint not null auto_increment primary key,
makhachhang bigint ,
content text,
thoigian datetime,
masanpham bigint );

create table loai_san_pham(
id bigint not null auto_increment primary key,
ten text,
note text);

create table san_pham(
id bigint not null auto_increment primary key,
ten nvarchar(50),
 manhasanxuat bigint,
 maloai bigint,
 ngaynhap datetime,
 ghichu text,
 gia bigint);
 
 create table anh_san_pham(
id bigint not null auto_increment primary key,
masanpham bigint,
img blob);

 
 create table hoa_don_khach_hang(
 id bigint not null auto_increment primary key,
 thoigian datetime,
 tongtien bigint,
 trangthai bigint,
 mavandon bigint,
 makhachhang bigint);
 
 create table chi_tiet_hoa_don(
 id bigint,
 mahoadon bigint,
 masanpham bigint,
 soluong int,
 dongia bigint);
 
 create table chi_tiet_nhap(
 id bigint not null auto_increment primary key,
masanpham bigint,
soluong int,
dongia bigint,
ghichu text,
mahoadon bigint);

create table khuyen_mai(
id bigint not null auto_increment primary key,
khuyenmaiphantram bigint,
khuyennmaitien bigint,
masanpham bigint ,
tenkhuyenmai text );


create table hoa_don_nhap(
id bigint not null auto_increment primary key,
manhanvien bigint,
manhasanxuat bigint,
ngay datetime,
tongtien bigint);


create table gioi_tinh (
id bigint not null auto_increment primary key,
loaigioitinh text );

create table quyen(
id bigint not null auto_increment primary key,
tenquyen text ,
manhanvien bigint);

create table nhanvien (
id bigint not null auto_increment primary key,
numberphone bigint,
hoten text,
username text,
matkhau bigint);

create table khachhang(
id bigint not null auto_increment primary key,
cccd text,
address text,
numberphone text,
magioitinh text,
username text ,
matkhau text,
hoten text);

create table notificaton (
id bigint not null auto_increment primary key,
batdau datetime ,
ketthuc datetime,
mathongbao bigint

);
create table loai_thong_bao(
id bigint not null auto_increment primary key,
notificatonname  text not null) ;

create table nha_san_xuat(
id bigint not null auto_increment primary key,
name nvarchar(50) ,
numberphone nvarchar(12),
address nvarchar(50),
note nvarchar(200));


ALTER TABLE chi_tiet_san_pham ADD CONSTRAINT fk_masanpham_chitietsanpham FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE chi_tiet_san_pham ADD CONSTRAINT fk_masanpham_color FOREIGN KEY (macolor) REFERENCES color(id);
ALTER TABLE chi_tiet_san_pham ADD CONSTRAINT fk_masanpham_size FOREIGN KEY (masize) REFERENCES size(id);
ALTER TABLE binh_luan ADD CONSTRAINT fk_masanpham_id FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE media_comment ADD CONSTRAINT fk_mbinhluan FOREIGN KEY (macomment) REFERENCES binh_luan(id);
ALTER TABLE loai_san_pham ADD CONSTRAINT fk_masanpham_loai FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE khuyen_mai ADD CONSTRAINT fk_masanpham_khuyenmai FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE chi_tiet_nhap ADD CONSTRAINT fk_masanpham_nhap FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE chi_tiet_hoa_don_khach_hang ADD CONSTRAINT fk_masanpham_hoadonkhachhang FOREIGN KEY (masanpham) REFERENCES san_pham(id);
ALTER TABLE chi_tiet_hoa_don_khach_hang ADD CONSTRAINT fk_mahoadon_hoadonkhachhang FOREIGN KEY (mahoadon) REFERENCES hoa_don_khach_hang(id);
ALTER TABLE hoa_don_khach_hang ADD CONSTRAINT fk_makhachhang_hoadonkhachhang FOREIGN KEY (makhachhang) REFERENCES khachhang(id);
ALTER TABLE khachhang ADD CONSTRAINT fk_magioitinh_khachhang FOREIGN KEY (magioitinh) REFERENCES gioi_tinh(id);
ALTER TABLE chi_tiet_nhap ADD CONSTRAINT fk_mahoadon_nhap FOREIGN KEY (mahoadon) REFERENCES hoa_don_nhap(id);
ALTER TABLE hoa_don_nhap ADD CONSTRAINT fk_manhanvien_nhap FOREIGN KEY (manhanvien) REFERENCES nhanvien(id);
ALTER TABLE san_pham ADD CONSTRAINT fk_manhasanxuat_sanpham FOREIGN KEY (manhasanxuat) REFERENCES nha_san_xuat(id);
ALTER TABLE anh_san_pham ADD CONSTRAINT fk_masanpham_anhsanpham FOREIGN KEY (masanpham) REFERENCES san_pham(id);

insert into nhanvien ( numberphone,username,hoten,matkhau)
value('0000000000','bac','Tran Xuan Bac','1234'); 

insert into anh_san_pham(masanpham,img)
value(1,'data:image/png;base64,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'); 

insert into  nha_san_xuat  (name ,numberphone,address) 
value( 'Luxry' , '+1121567890', '12 Hai Bà Trưng , Hà Nội');
insert into  loai_san_pham  (ten) 
value( 'Áo' );
insert into san_pham (ten,manhasanxuat ,maloai ,ngaynhap ,soluong , ghichu , gia )
value ('Áo Polo LX',1,1,'2023-11-11 12:30:00',200,'áo nam giầy dặn , hình in sắc nét', 200000);
select * from nha_san_xuat ;
select  * from san_pham  limit 20;
select * from anh_san_pham ;
select  san_pham.id,san_pham.ten,san_pham.soluong,san_pham.gia,nha_san_xuat.name,san_pham.ghichu from san_pham inner join nha_san_xuat on san_pham.manhasanxuat=nha_san_xuat.id;
USE mysql;
select* from san_pham;
SELECT * FROM user;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'YES';
GRANT ALL ON *.* to 'localhost'@'root';
-- ALTER USER 'root'@'BAC' IDENTIFIED BY 'YES';