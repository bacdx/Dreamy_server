const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb,getKey } = require('../../untl')
class ProductController {

    index(req, res) {
        const sql= "select san_pham.ten,san_pham.soluong,san_pham.gia,nha_san_xuat.name,san_pham.ghichu from san_pham inner join nha_san_xuat on san_pham.manhasanxuat=nha_san_xuat.id  limit 20;";
        const query=req.query;
        
        const keys=Object.keys(query).forEach((key) => {

        });


        if(query!=undefined||query!=null||Object.keys(query).length!=0){
           
        }

         
        con.query(sql, function (err, result, fields) {

            const data = result;
            data.forEach(element => {
                element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
            });
            con.query("select * from anh_san_pham ;", (err, result) => {
              
                 const img = bytetoBase64(result[0].img);
               data.forEach((data) => {
                data.img=img;
               })
            })

           
            if (data == undefined) {
                const error = {
                    error: "Product not found"
                }
                res.send(error);
            } else {
               
                // console.log(data);
                res.render("product", { data: data});
            }


        })


    }


    async getProduct(req, res) {


        con.query("select  * from sanpham where limit 20;", function (err, result, fields) {

            const data = result;
            data.forEach(element => {
                element.anh_dai_dien = blobtoBase64(element.anh_dai_dien)
            });

            console.log(data);
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