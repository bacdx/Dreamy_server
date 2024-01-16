const con = require('../../connect/connectmysql');
const fs = require('fs');
const path = require('node:path');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
const CryptoJS = require('crypto-js'); // npm install crypto-js
const { v1: uuid } = require('uuid'); // npm install uuid
const moment = require('moment'); // npm install moment
const { response } = require('express');
const { resolve } = require('path');
const e = require('express');
const { Console } = require('console');
const axios = require('axios').default; // npm install axios
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

    async getChitietSanPham(req, res) {
        const masanpham = req.query.masanpham;
        console.log(masanpham);
        const sql = "select * from chi_tiet_san_pham where masanpham=?";
        con.query(sql, [masanpham], (err, result, fields) => {
            console.log(result)
            res.json(result);
           
        })


    }
    async getChitietSanPham1(req, res) {
        // console.log("ok")
        const params =req.body;
        console.log(params)
   


        const listPromise=[];
        const listdata=[];

        const sql = "select * from chi_tiet_san_pham  where masanpham=? and masize =? and mamau =?";
        // const sql1 = "select s.id,s.ten,s.manhasanxuat ,maloai,ngaynhap,ghichu,gia,khuyenmai,img from san_pham as s  left join anh_san_pham as a on s.id = a.masanpham where s.id=? group by s.id  ;";

        for(var i = 0; i < params.length; i++){
            const currentParam = params[i];
           
            const promise=new Promise((resolve,reject)=>{
               
                con.query(sql,[currentParam.maSanPham,currentParam.maSize,currentParam.maColor], (err, result, fields) => {
                    // console.log(i)
                    // console.log(result)
               currentParam.productDetal=result;
               resolve(result.length > 0 ? result[0] : {});
               
              
                    
                })
                
               
            })
            listPromise.push(promise);
        }
        Promise.all(listPromise).then((data)=>{
            console.log("start")
             const filteredData = data.filter((item) => Object.keys(item).length !== 0);
             console.log(filteredData)
             console.log("end")
             res.json(filteredData)
              
        })
        


    }

    async getSanPham(req, res) {
// <<<<<<< HEAD
//         let query = req.query;
      
//             const sql = "SELECT sp.*, MIN(asp.img) as img, sp.ten as ten_san_pham, lsp.ten as ten_loai_san_pham "+
//             "FROM san_pham sp "+
//             "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
//             "JOIN loai_san_pham lsp ON sp.maloai = lsp.id " + 
//              " GROUP BY sp.id ;";
//             console.log(sql);
//             con.query(sql, function (err, result, fields) {

//                 const data = result;
//                 // data.forEach(element => {
//                 //     element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
//                 // });



//                 if (data == undefined) {
//                     const error = {
//                         error: "Product not found"
//                     }
//                     res.json(error);
//                 } else {
// =======
        const id = req.query.id;
        // console.log(req.query);
        const sql = "select s.id,s.ten,s.manhasanxuat ,ngaynhap,ghichu,gia,img from san_pham as s  left join anh_san_pham as a on s.id = a.masanpham  where s.id> ? group by s.id limit 10 ;    "

        con.query(sql, [Number.parseInt(id)], function (err, result, fields) {

            const data = result;



                    res.json(data);

                //}


            })

    }

    async getSanPham1(req, res) {
        const id = req.query.id;
        const sql = "select s.id,s.ten,s.manhasanxuat ,maloai,ngaynhap,ghichu,gia,khuyenmai,img from san_pham as s  left join anh_san_pham as a on s.id = a.masanpham where s.id=? group by s.id  ;    "


        con.query(sql, [id], function (err, result, fields) {

            const data = result;
            // console.log(result);


            if (data == undefined) {
                const error = {
                    error: "Ko tim thay Loai san pham"
                }
                res.send(error);
            } else {


                res.json(data[0]);

            }


        })


    }
    async getSanPham2(req, res) {
     try{
        const ids = req.query.id;
        // console.log(ids)
        const sql = "SELECT s.*, img FROM san_pham AS s LEFT JOIN anh_san_pham AS a ON s.id = a.masanpham WHERE s.id = ? GROUP BY s.id";
        const data = []
        const listP = [];
        for (var i = 0; i < ids.length; i++) {
            const promise = new Promise(resolve => {
                con.query(sql, [ids[i]], (err, result) => {
                   
                    data.push(result[0]);
                    resolve(result[0]);
                }); // Using destructuring to get the first row

            })
            listP.push(promise);
        }
        Promise.all(listP).then(resolve => {
            // console.log(data);
            res.json(data);
        })
    }catch(err) {
        res.status(500);
    }




    }


    async getSearch(req, res) {
        const sql = "select id,ten from san_pham ;    "
        con.query(sql, function (err, result, fields) {
            res.json(result)
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
                const sql = "select b.*,k.hoten,k.avatar from binh_luan as b inner join khachhang as k on b.makhachhang=k.id  where masanpham =" + query.masanpham + ";";
                con.query(sql, function (err, result, fields) {
                    const promises=[]
                    for (var i = 0; i < result.length; i++) {
                        const data = new Promise((resolve, reject) => {
                            const base = fs.readFileSync(result[i].avatar)
                            result[i].avatar=base.toString("base64")
                           resolve()
                        })
                        promises.push(data)

                       
                    }
                    Promise.all(promises).then(()=>{
                        res.json(result)
                       })

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
    async getHuyDon(req, res, ) {
        

        const sql = "update hoa_don_khach_hang set trangthai=3 where id=? and trangthai=0 ";
        console.log(sql);
        con.query(sql,[req.query.id] ,function (err, result, fields) {
            console.log(result)
            const data = result;

            if (data == undefined) {
                const error = {
                    error: "Product not found"
                }
                res.json(error);
            } else {

                console.log(data);
                res.json(data);

            }


        })

    }

    async getChiTietHoaDonKhachHang(req, res) {
        console.log(req);

        const query = req.query;
        const sql = "select * from chi_tiet_hoa_don as c  inner join hoa_don_khach_hang as h on c.mahoadon=h.id where mahoadon=?";
        con.query(sql, [query.mahoadon], function (err, result, fields) {


            console.log(result);
            res.json(result);


        })





    }
    
    async getDonHangbyIdAccount(req, res) {
        let query = req.query;
        let where = "where ";

        if (query.makhachhang != undefined, query.makhachhang != null) {
            where += "makhachhang=" + query.makhachhang;
        }



        const sql = "select k.hoten, h.id,h.address,DATE_FORMAT(h.thoigian, '%m-%d-%Y %H:%i:%s') as thoigian ,h.tongtien,h.trangthai from khachhang as k inner join hoa_don_khach_hang as h on k.id=h.makhachhang   " + where + " ;";
        console.log(sql);
        con.query(sql, function (err, result, fields) {

            const data = result;

            if (data == undefined) {
                const error = {
                    error: "Product not found"
                }
                res.json(error);
            } else {

                console.log(data);
                res.json(data);

            }


        })

    }
    

    async getChiTietHoaDonKhachHang(req, res) {
        console.log(req);

        const query = req.query;
        const sql = "select * from chi_tiet_hoa_don as c  inner join hoa_don_khach_hang as h on c.mahoadon=h.id where mahoadon=?";
        con.query(sql, [query.mahoadon], function (err, result, fields) {


            console.log(result);
            res.json(result);


        })





    }
    async getChiTietHoaDonKhachHang2(req, res) {
        console.log(req);

        const query = req.query;
        const sql = "select c.*, s.ten,n.name,a.img ,cl.title as mau,sz.title as size from chi_tiet_hoa_don as c join anh_san_pham as a on c.masanpham=a.masanpham left join san_pham as s on s.id=c.masanpham left join nha_san_xuat as n on n.id=s.manhasanxuat inner join color as cl on c.mamau=cl.id inner join size as sz on c.masize= sz.id  where c.mahoadon=? group by c.id;        ";
        con.query(sql, [query.mahoadon], function (err, result, fields) {

            console.log(result);
            res.json(result);

        })
    }

    async getSanPhams(req, res) {

        let query = req.query;
        let where = "where ";
// <<<<<<< HEAD
       
//             if (query.ma_loai != undefined, query.ma_loai != null) {
//                 where += "lsp.id =" + query.ma_loai;
//             }   



//             const sql = "SELECT sp.*, MIN(asp.img) as img, sp.ten as ten_san_pham, lsp.ten as ten_loai_san_pham "+
//             "FROM san_pham sp "+
//             "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
//             "JOIN loai_san_pham lsp ON sp.maloai = lsp.id "
//              + where + 
//              " GROUP BY sp.id ;";
//             console.log(sql);
//             con.query(sql, function (err, result, fields) {
// =======

        if (query.ma_loai != undefined, query.ma_loai != null) {
            where += "maloai=" + query.ma_loai;
        } else if (query.manhasanxuat != undefined, query.manhasanxuat != null) {
            where += "manhasanxuat=" + query.manhasanxuat;
        }



        const sql = "select * from san_pham as s left join nha_san_xuat as n   on s.manhasanxuat=n.id left join anh_san_pham as a on a.masanpham=s.id " + where + " group by s.id   limit 20;";
        console.log(sql);
        con.query(sql, [], function (err, result, fields) {


            const data = result;
            // data.forEach(element => {
            //     element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
            // });



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

    async getImgSanPham(req, res) {

        let query = req.query;
        let where = "where ";

        if (query.masanpham != undefined, query.masanpham != null) {
            where += "masanpham=" + query.masanpham;
        }



        const sql = "select * from anh_san_pham " + where + "  ;";
        console.log(sql);
        con.query(sql, function (err, result, fields) {

            const data = result;
            // data.forEach(element => {
            //     element.anh_dai_dien = bytetoBase64(element.anh_dai_dien)
            // });



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
        const sql = "select * from hoa_don_khach_hang where makhachhang like ?";

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
        const sql = "Insert into chi_tiet_hoa_don_khach_hang"
        con.beginTransaction
        con.commit
    }
    async Signin(req, res, next) {
        const user = req.body;
        const pathAvatar = path.join("C:\\Users\\ASUS\\Desktop\\Dreamy_server\\src\\app\\resources\ \hacker.png")

        // const promise = new Promise((resolve, reject) => {
        //     fs.readFile(pathAvatar, (err, data) => {
        //         resolve(data);
        //         reject(err);
        //     })
        // })



        // promise.then((data) => {
        // path.join(__dirname,)

        // const defaultAvatar=fs.readFile()
        user.avatar = pathAvatar;
        const propertyvalues = Object.values(user);
        console.log(user);
        try {
            con.beginTransaction();
            con.query(`SELECT * FROM khachhang WHERE username like ? `, [user.username], function (err, result) {
                console.log(result);
                if (result.length > 0) {
                    res.status(400).json('Username already exists');
                    return;
                }

                const sql = "Insert into khachhang (address,username,matkhau,avatar) values (?,?,?,?)";
                con.query(sql, propertyvalues, function (err, result) {
                    res.status(200)
                    // const sql1="SELECT * FROM khachhang WHERE id = ? "
                    // con.query(sql1,[result.insertId],function(err, result) {
                    //     // console.log(result[0]);
                    //     res.status(200).json(result[0])
                    // })
                })
            });


        } finally {
            con.commit


        }
        // }).catch((err) => {
        //     console.log(err);
        // });





        // con.


    }

    async UpdateAccount(req, res, next) {
        const user = req.body;
        const dirFiled = "D:\\data\\" + "avatar_" + user.id + ".jpg";
        user.avatar = Buffer.from(user.avatar, 'base64')


        if (fs.existsSync(dirFiled)) {
            fs.writeFileSync(dirFiled, user.avatar, (err, data) => {
                console.log(err);
                console.log(data);
            })
        } else {
            fs.appendFileSync(dirFiled, user.avatar, (err, data) => {
                console.log(err);
                console.log(data);
            })
        }
        const sql = "update khachhang  SET email=?, numberphone=?,hoten=?,avatar=? WHERE id=?;"
        const sqlSelect = "select * from  khachhang   WHERE id=?;"

        try {
            con.query(sql, [user.address, user.numberphone, user.username, dirFiled, user.id], (err, data, fields) => {

                con.query(sqlSelect, [user.id], (err, data, fields) => {
                    console.log(data);
                    const dataimg = new Promise((resolve, reject) => {
                        resolve(fs.readFileSync(data[0].avatar))
                    })
                    dataimg.then(response => {
                        data[0].avatar = response.toString('base64')
                        console.log(data[0]);
                        res.json(data[0]);
                    })

                })

            })
        } catch (e) {
            console.log(e);
        }




    }


    async Login(req, res, next) {
        const user = req.body;
        console.log(user);
        const propertyvalues = Object.values(user);
        console.log(propertyvalues);
        try {
            con.beginTransaction();
            con.query(`SELECT * FROM khachhang WHERE username like ? and matkhau like ? `, [user.address, user.matkhau], function (err, result) {
                console.log(err)

                if (result.length > 0) {

                    const data = new Promise((resolve, reject) => {
                        resolve(fs.readFileSync(result[0].avatar))
                    })

                    data.then(resolve => {
                        result[0].avatar = resolve.toString("base64").trim();
                        res.status(200).json(result[0]);
                        return;
                    }).catch(err => {
                        res.status(400)
                    })



                }
                else {
                    res.status(400)
                }


            });




            //   console.log(results);


        } finally {
            con.commit


        }
        // con.


    }
    async createOrder(req, res) {
        console.log("Create Order")
        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();
        const time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds


        const result = req.body;
        // console.log(result);
        const embed_data = {};

        const config = {
            appid: "2554",
            key1: "PcY4iZIKFCIdgZvsdngKKJmqEMzvh5QQcdD2A9XBSKUNaYnA6ueMcMHHUbRLYjPL",
            key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create"
        };


        const items = result.item;
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: Number.parseInt(result.app_id),
            app_time: result.app_time, // miliseconds
            app_trans_id: result.app_trans_id, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: result.app_user,

            item: result.item,
            embed_data: "{}",
            amount: result.amount,
            description: `Dreamy - Payment for the order #${transID}`,
            bankcode: "zalopayapp",
            mac: result.mac,
        };


        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = order.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        // order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


        const item = JSON.parse(order.item);
        console.log(item);
        let sumPrice = 0;

        axios.post(config.endpoint, null, { params: order })
            .then(response => {

                con.beginTransaction;
                const sqlCreateBuild = "insert into hoa_don_khach_hang (thoigian,tongtien,trangthai,makhachhang,address) values (?,?,?,?,?)";
                const sqlUpdateBuild = "update hoa_don_khach_hang set trangthai =0 where id=?";
                con.query(sqlCreateBuild, [time, order.amount, 4, order.app_user,result.address], (err, results, fields) => {
                    const resId = results.insertId;
                    console.log("Insertid:"+ results.insertId)
                    const sqlCreateBuildDetal = "insert into chi_tiet_hoa_don (mahoadon,mactsanpham,masanpham,masize,mamau,soluong,dongia) values (?,?,?,?,?,?,?)";
                    const sqlUpdate = "update chi_tiet_san_pham set soluong=soluong - ? where id=? and masize=? and mamau=?";


                    for (let i = 0; i < item.length; i++) {
                        console.log(i);
                        con.query(sqlCreateBuildDetal, [resId, item[i].maCTSanPham,item[i].maSanPham, item[i].masize, item[i].mamau, item[i].soLuong, item[i].donGia],(fields)=>{
                            console.log(fields)
                        })
                        con.query(sqlUpdate, [item[i].soLuong, item[i].maCTSanPham, item[i].masize, item[i].mamau])


                    }
                    con.query(sqlUpdateBuild, [resId])

                    response.data.id = resId;
                    console.log(response.data);
                    res.send(response.data);
                })

                con.commit;

                // console.log(response.data);


            })
            .catch(err => console.log(err));


    }


    setTime() {

        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();

        // prints date in YYYY-MM-DD format
        console.log(year + "-" + month + "-" + date);

        // prints date & time in YYYY-MM-DD HH:MM:SS format

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    }



    // async payoder(req,res){
    //     cons
    // }


    async pay(require, response) {
        console.log("Pay")
        console.log(require.query)
        if (require.query.statusCode == '0') {
            const sql = "update hoa_don_khach_hang set trangthai=0 where id=?"
            con.query(sql, [require.query.id])

            console.log("Ok");

        }

        // hoan tra
        else if (require.query.statusCode == '1') {
            const sqlSelectCTHD = "select a.id,a.mactsanpham,a.soluong from chi_tiet_hoa_don as a inner join hoa_don_khach_hang as h on a.mahoadon=h.id where a.mahoadon=? and h.trangthai=4";
            const sqlHoanTraSoLuong = "update chi_tiet_san_pham set soluong=soluong+? where id=?"
            con.query(sqlSelectCTHD, [require.query.id], (err, results) => {
                console.log(results);
                for (let i = 0; i < results.length; i++) {

                    con.query(sqlHoanTraSoLuong, [results[i].soluong, results[i].mactsanpham])

                }


            });

        }


        else {
            const sqlSelectCTHD = "select a.id,a.mactsanpham,a.soluong from chi_tiet_hoa_don as a inner join hoa_don_khach_hang as h on a.mahoadon=h.id where a.mahoadon=? and h.trangthai=4";
            const sqlHoanTraSoLuong = "update san_pham set soluong=soLuong+? where id=?"
            con.query(sqlSelectCTHD, [require.query.id], (err, results) => {
                console.log(results);
                for (let i = 0; i < results.values.length; i++) {
                    con.query(sqlHoanTraSoLuong, [results[i].soluong, results[i].mactsanpham])
                    console.log("ok");
                }


            });
        }
        
        response.json(require.query.id)
    }

    async huyDon(req, res, next) {
        const idBill = req.body;
        const check = "select * from hoa_don_khach_hang where id=? and trang thai=3";
        const sql = "update hoa_don_khach_hang set trangthai= 3 where id=?";
        const promiseCheck = new Promise((resolve, reject) => {
            con.query(check, [idBill], (req, res, next) => {
                if (req != null) {
                    resolve(req)
                }
            })
        })

        promiseCheck.then((res) => {
            con.query(sql, [idBill], (data, err) => {
                if (err != null || data != undefined) {
                    res.status(-400).json(err);
                } else {
                    res.status(200).json(data);
                }
            })
        })




    }
    async huyDonnv(req, res, next) {
        const data = req.body;
        const check = "select * from hoa_don_khach_hang where id=? and trang thai=3";
        const sql = "update hoa_don_khach_hang set trangthai= 3,manhanvien=manv where id=?";

        const promiseCheck = new Promise((resolve, reject) => {
            con.query(check, [data.idBill, data.manv], (req, res, next) => {
                if (req != null) {
                    resolve(req)
                }
            })
        })

        promiseCheck.then((res) => {
            con.query(sql, [idBill], (data, err) => {
                if (err != null || data != undefined) {
                    res.status(-400).json(err);
                } else {
                    res.status(200).json(data);
                }
            })
        })




    }
    async changeFav(req, res, next) {
        const data = req.body;
        const sqlSelect = "select * from favorite where masp =? and makhachhang=? "
        const sqlInsert = "insert into  favorite (masp,makhachhang) values (?,?)"
        const sqldelete = "delete from favorite where masp =? and makhachhang =? "

        con.query(sqlSelect, [data.masp, data.makhachhang], (err, results) => {
            if (results.length > 0) {
                con.query(sqldelete, [data.masp, data.makhachhang])
                res.join({ code: 0 });
            }
            else {
                con.query(sqlInsert, [data.masp, data.makhachhang])
                res.join({ code: 1 });
            }
        })

    }
    async Top(req, res) {
        const data = req.query
        const sqlSelect = "SELECT s.*,count(f.masp) as count ,a.img  FROM san_pham as s inner join favorite as f on s.id=f.masp inner join anh_san_pham as a on s.id= a.masanpham group by(f.masp)  ORDER BY favorite DESC LIMIT 10 "
        con.query(sqlSelect, (err, results) => {
            res.json(results);
        })
    }

    async Favorite(req, res) {
        const data = req.query
        const sqlSelect = "SELECT s.*,a.img FROM san_pham as s inner join  favorite as f on s.id=f.masp inner join anh_san_pham as a on s.id= a.masanpham where f.makhachhang=?  group by(s.id) "
        con.query(sqlSelect, [data.makhachhang], (err, results) => {

            res.json(results);
        })
    }
}



module.exports = new ApiConController();