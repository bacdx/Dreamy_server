const con = require('../../connect/connectmysql');
class DoanhThuController{

    
        async doanhthu(req,res){
            
             con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ? ",[req.body.dayStart,req.body.dayEnd],
             function(err,relsut){
                if(err) throw err ;
                console.log("Total :" ,relsut[0].total);
                res.render("doanhthu",{tongtien: relsut[0].total})
             })   
        }
        async view(req,res){
            con.query("SELECT sp.ten, sp.gia,SUM(ctn.soluong) AS total, asp.img "+
           " FROM chi_tiet_nhap ctn "+
           " JOIN san_pham sp ON ctn.masanpham = sp.id "+
            " JOIN anh_san_pham asp ON asp.masanpham = sp.id "+
            " GROUP BY ctn.masanpham "+
            " ORDER BY total DESC "+
            " LIMIT 10; ",function (err,data) {
                if(err) throw err ;
                console.log(data);
                res.render("doanhthu",{data:data});
            })
        }
   


}
module.exports = new DoanhThuController();