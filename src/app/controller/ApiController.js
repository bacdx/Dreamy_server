const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
class ApiConController {
    async getLoaiSanPham(req, res) {
        var sql = "select * from loai_san_pham;";

        // if (req.query.ma_loai != undefined || req.query.ma_loai !== null) {
        //     sql ="select  * from loai_san_pham where id= "+req.query.ma_loai+";";
        // }


        con.query(sql, function (err, result, fields) {

            const data = result;


            if (data == undefined) {
                const error = {
                    error: "Ko tim thay Loai san pham"
                }
                res.send(error);
            } else {


                res.send(data);

            }


        })



    }

    async getSanPham(req, res) {
        const sql = "select * from san_pham"
        // console.log(req.query);
        // const query = req.query;
        // const where = " ";
        // if (Object.keys(query).length>0) {
        //     where+="where "
        //     if (query.ma_loai != undefined, query.ma_loai != null) {
        //         where += "ma_loai=" + query.ma_loai;
        //     }


        // }




        con.query(sql, function (err, result, fields) {

            const data = result;


            if (data == undefined) {
                const error = {
                    error: "Ko tim thay Loai san pham"
                }
                res.send(error);
            } else {


                res.json(data);

            }


        })


    }

    async getColorbyMaSanPham(req, res) {
        const query = req.query;
        if (Object.keys(query).length > 0) {
            if (query.masp != undefined && query.masp != null) {
                const sql = "select * from color where masp=" + query.masp + ";";
                con.query(sql, function (err, result, fields) {
                    if (err) throw res.json(err);
                    res.json(result)

                });

            }
        }
    }



    async getSizeByMaSanPham(req, res) {
        const query = req.query;

        if (Object.keys(query).length > 0) {
            if (query.masp != undefined && query.masp != null) {
                const sql = "select * from size where masp=" + query.masp + ";";
                con.query(sql, function (err, result, fields) {
                    if (err) throw res.json(err);
                    res.json(result)
                });

            }
        } else {
            res.send(400)
        }

    }

    async getCommentsByMaSanPham(req, res) {
        const query = req.query;
        if (Object.keys(query).length > 0) {
            if (query.masanpham != undefined && query.masanpham != null) {
                const sql = "select * from binh_luan where masanpham =" + query.masanpham + ";";
                con.query(sql, function (err, result, fields) {
                    if (err) throw res.json(err);
                    res.json(result)
                });

            }
        }
    }
    async getContentsByMaBinhLuan(req, res) {
        const query = req.query;
        if (Object.keys(query).length > 0) {
            if (query.masanpham != undefined && query.mabinhluan != null) {
                const sql = "select * from media_comment where macomment =" + query.mabinhluan + ";";
                con.query(sql, function (err, result, fields) {
                    res.render(result);
                });

            }
        }
    }

    async getDonHangbyIdAccount(req,res){
        let query = req.query;
        let where = "where ";
       
            if (query.makhachhang != undefined, query.makhachhang != null) {
                where += "makhachhang=" + query.makhachhang;
            }   



            const sql = "select * from khachhang as k inner join hoa_don_khach_hang as h on k.id=h.makhachhang  " + where + " ;";
            console.log(sql);
            con.query(sql, function (err, result, fields) {

                const data = result;
               
                if (data == undefined) {
                    const error = {
                        error: "Product not found"
                    }
                    res.json(error);
                } else {


                    res.json(data);

                }


            })



        
    }

    async getChiTietHoaDonKhachHang(req,res){
        let query = req.query;
        let where = "where ";
       
            if (query.mahoadon != undefined, query.mahoadon != null) {
                where += "mahoadon=" + query.mahoadon;
            }   



            const sql = "select * from chi_tiet_hoa_don as c  inner join hoa_don_khach_hang as h on c.mahoadon=h.id  " + where + " ;";
            console.log(sql);
            con.query(sql, function (err, result, fields) {

                const data = result;
               

                if (data == undefined) {
                    const error = {
                        error: "Product not found"
                    }
                    res.json(error);
                } else {


                    res.json(data);

                }


            })



        
    }

    async getSanPhams(req, res) {

        let query = req.query;
        let where = "where ";
       
            if (query.ma_loai != undefined, query.ma_loai != null) {
                where += "maloai=" + query.ma_loai;
            }   



            const sql = "select s.id,s.ten,s.gia ,n.name from san_pham as s inner join nha_san_xuat as n on s.manhasanxuat=n.id  " + where + "  limit 20;";
            console.log(sql);
            con.query(sql, function (err, result, fields) {

                const data = result;
                data.forEach(element => {
                    element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
                });



                if (data == undefined) {
                    const error = {
                        error: "Product not found"
                    }
                    res.json(error);
                } else {


                    res.json(data);

                }


            })



        
    }
    async getHoaDonKhachHang(req, res, next) {
        const maKhachHang = req.query.id;
        if (maKhachHang == undefined || maKhachHang == null) return res.send(404);
        const sql = "select * from hoa_don_khach_hang where id";

        con.query(sql, [maKhachHang], function (err, results, fields) {
            if (err) throw err;
            res.json(results);
        })
        //getchitiethoadon
    }
    async getChiTietHoaDonKhachHang(req, res, next) {
        const maHoaDon = req.query.id;
        const sql = "select * from chi_tiet_hoa_don_khach_hang where id=?";

        con.query(sql, [maHoaDon], function (err, results, fields) {
            res.json(results)

        })


        //getchitiethoadon 


    }

    async postComment(req, res, next) {
        const sql ="Insert into chi_tiet_hoa_don_khach_hang"
        con.beginTransaction
        con.commit
    }


}

module.exports = new ApiConController();