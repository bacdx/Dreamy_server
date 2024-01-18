const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
var { formidable } = require('formidable');
var fs = require('fs');
class ReceivedController {
    async index(req, res) {

        if (req.method == "POST") {
            const form = formidable({});
            const [fields, files] = await form.parse(req);
            console.log(fields);
                // truy van đơn hàng
                // con.query("insert into hoa_don_khach_hang (hoten,numberphone,address, tongtien, trangthai, mavandon, makhachhang )value ('" + fields.tensanpham[0] + "',1," + fields.loaisanpham[0] + "," + fields.note[0] + "'," + fields.gia[0] + ");", function (err, result) {
                //     if (err) throw err;
                //     const id = result.insertId;
                //     console.log(result)
                
                // });

        }

        const sql = "select khachhang.hoten,khachhang.numberphone,khachhang.address,hoa_don_khach_hang.tongtien from hoa_don_khach_hang inner join khachhang on hoa_don_khach_hang.makhachhang=khachhang.id  limit 20;";
        const splsp = "select * from san_pham ";
        con.query(splsp, function (err, result) {
            const sps = result;
            con.query(sql, function (err, result, fields) {

                const data = result;
                    
                if (data == undefined) {
                    const error = {
                        error: "received not found"
                    }
                    res.send(error);
                } else {

                    // console.log(data);
                    res.render("received", { data: data, sps: sps });
                }


            })
        })

    }

    async getReceived(req, res) {
        con.query("select  * from hoa_don_khach_hang where limit 20;", function (err, result, fields) {

            const data = result;
        
            // console.log(data);
            if (data != undefined) {
                const error = {
                    error: "received not found"
                }
                res.send(error);
            } else {
                res.send(data);
            }


        })


    }

    

    async seleteReceived(req, res) {
        const { id, hoten, numberphone, address, trangthai,tongtien, makhachhang ,mavandon} = req.body;
        console.log(hoten, numberphone, address,trangthai,tongtien, makhachhang,mavandon);


        var sql = "INSERT INTO sanpham ( hoten,numberphone,address, tongtien, trangthai, mavandon, makhachhang) VALUES ('" + hoten + "'," + numberphone + "'," + address + "'," + tongtien + "',"+ trangthai + ",'" + mavandon + "'," + makhachhang + ")";
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
    async insertProduct(req, res) {
        const { id, hoten, numberphone, address, trangthai,tongtien, makhachhang ,mavandon} = req.body;
        console.log(hoten, numberphone, address,trangthai,tongtien, makhachhang,mavandon);


        var sql = "INSERT INTO hoa_don_khach_hang ( hoten,numberphone,address, tongtien, trangthai, mavandon, makhachhang) VALUES ('" + hoten + "'," + numberphone + "'," + address + "'," + tongtien + "',"+ trangthai + ",'" + mavandon + "'," + makhachhang + ")";
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

    async updateReceived(req, res) {

        const { id, hoten, numberphone, address, trangthai,tongtien, makhachhang ,mavandon} = req.body;
        console.log(hoten, numberphone, address,trangthai,tongtien, makhachhang,mavandon);

    
        var sql = " UPDATE  hoa_don_khach_hang  SET hoten='" + hoten + "', numberphone=" + numberphone + ",address=" + address + ",trangthai='" + trangthai + "',tongtien=" + tongtien+ "',mavandon=" + mavandon + ",makhachhang='" + makhachhang + "')";
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

module.exports = new ReceivedController();