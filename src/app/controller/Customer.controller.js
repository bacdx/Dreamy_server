const con = require('../../connect/connectmysql');
var { validationResult } = require('express-validator');
class CustomerController{

        // view nsx
        async view(req,res){
            con.query("SELECT * FROM khachhang ",function(err,data){
                if(err) throw err ;
                console.log(data);
                res.render("customer",{data:data});
            })
            

        }

  


    async viewDeltail(req,res){
    
        con.query("SELECT  hd.makhachhang , cthd.soluong, "+
        'sz.title AS size_title , cl.title AS color_title , '+
        'sp.ten AS san_pham_ten , asp.img AS anh_san_pham_img '+
        'FROM hoa_don_khach_hang hd '+
        'JOIN chi_tiet_hoa_don cthd ON hd.id = cthd.mahoadon '+
        'JOIN chi_tiet_san_pham ctsanpham ON cthd.mactsanpham = ctsanpham.id '+
        'JOIN size sz ON ctsanpham.masize = sz.id '+
        'JOIN color cl ON ctsanpham.mamau = cl.id '+
        'JOIN san_pham sp ON ctsanpham.masanpham = sp.id '+
        'JOIN '+
        '(SELECT masanpham, MIN(img) as img FROM anh_san_pham GROUP BY masanpham) asp ON sp.id = asp.masanpham '+
        'WHERE '+
        'hd.trangthai = 5 AND hd.makhachhang = ? ;'
        ,[req.params.id],function(err,result){
            if(err) throw err;
            console.log("Data : " ,result)
                res.render('customer-oder',{result:result})
               
        })

    }



}
module.exports = new CustomerController();