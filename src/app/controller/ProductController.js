const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
var { formidable } = require('formidable');
var fs = require('fs');
class ProductController {

    async index(req, res) {

        if (req.method == "POST") {
            const form = formidable({});
            const [fields, files] = await form.parse(req);
            console.log(fields);

            const objFiles = files.filetoupload[0];
            const base64Array = files.filetoupload.map(file => {
                fs.readFile(file.filepath, async (err, data) => {

                    const base64 = "data:" + objFiles.mimetype + ";base64," + data.toString('base64');
                    return base64;

                })

                // truy van san pham
                con.query("insert into san_pham (ten,manhasanxuat ,maloai ,ngaynhap ,soluong , ghichu , gia )value ('" + fields.tensanpham[0] + "',1," + fields.loaisanpham[0] + ",'2023-11-11 12:30:00',200,'" + fields.note[0] + "'," + fields.gia[0] + ");", function (err, result) {
                    if (err) throw err;
                    const id = result.insertId;
                    console.log(result)
                    
                    for (let i = 0; i < fields.color.length; i++) {
                        con.query("INSERT INTO chi_tiet_san_pham (masanpham,soluong) VALUES (?,?)", [id, fields.soluong[i]], function (err, result) {
                            // truy van mau va size 
                            con.query("INSERT INTO color (mamau,title,img,mact) VALUES (?,?,?,?)", [id, fields.soluong[i], null, result.insertId])
                            con.query("INSERT INTO color (title,mact) VALUES (?,?,?,?)", [id, fields.soluong[i], result.insertId])

                        })

                    }


                });



            });






        }

        const sql = "select san_pham.ten,san_pham.soluong,san_pham.gia,nha_san_xuat.name,san_pham.ghichu from san_pham inner join nha_san_xuat on san_pham.manhasanxuat=nha_san_xuat.id  limit 20;";
        const sqlLoaiSp = "select* from loai_san_pham ";

        con.query(sqlLoaiSp, function (err, result) {

            const loaiSps = result;



            con.query(sql, function (err, result, fields) {

                const data = result;
                data.forEach(element => {
                    element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
                });
                con.query("select * from anh_san_pham ;", (err, result) => {

                    const img = bytetoBase64(result[0].img);
                    data.forEach((data) => {
                        data.img = img;
                    })
                })




                if (data == undefined) {
                    const error = {
                        error: "Product not found"
                    }
                    res.send(error);
                } else {

                    // console.log(data);
                    res.render("product", { data: data, loaiSps: loaiSps });
                }


            })
        })

    }


    async getProduct(req, res) {


        con.query("select  * from sanpham where limit 20;", function (err, result, fields) {

            const data = result;
            data.forEach(element => {
                element.anh_dai_dien = blobtoBase64(element.anh_dai_dien)
            });

            // console.log(data);
            if (data != undefined) {
                const error = {
                    error: "Product not found"
                }
                res.send(error);
            } else {
                res.send(data);
            }


        })


    }



    async insertProduct(req, res) {
        const { id, ten, manhasanxuat, ma_loai, ngaynhap, soluong, ghichu, gia, trangthai } = req.body;
        console.log(ten, manhasanxuat, ma_loai, ngaynhap, soluong, ghichu, gia, trangthai);


        var sql = "INSERT INTO sanpham (ten,manhasanxuat,ma_loai,ngaynhap,soluong,ghichu,gia,trangthai) VALUES ('" + ten + "'," + manhasanxuat + "," + ma_loai + ",'" + ngaynhap + "'," + soluong + ",'" + ghichu + "'," + gia + ",'" + trangthai + ")";
        con.query(sql, function (err, result, fields) {


            console.log(data);
            if (result != undefined) {
                res.send(data);
            }
            else {
                const err = {
                    error: "Dont Have Product"

                }
                res.send(err);
            }

        })

    }

    async updateProduct(req, res) {

        const { id, ten, manhasanxuat, ma_loai, ngaynhap, soluong, ghichu, gia, trangthai } = req.body;
        console.log(ten, manhasanxuat, ma_loai, ngaynhap, soluong, ghichu, gia, trangthai);


        var sql = " UPDATE  sanpham  SET ten='" + ten + "', manhasanxuat=" + manhasanxuat + ",ma_loai=" + ma_loai + ",ngaynhap='" + ngaynhap + "',soluong=" + soluong + ",ghichu='" + ghichu + "',gia=" + gia + ",trangthai='" + trangthai + "')";
        con.query(sql, function (err, result, fields) {


            console.log(data);
            if (result != undefined) {
                res.send(data);
            }
            else {
                const err = {
                    error: "Dont Have Product"

                }
                res.send(err);
            }

        })

    }






}

module.exports = new ProductController();