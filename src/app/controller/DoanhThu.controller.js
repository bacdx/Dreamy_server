const con = require('../../connect/connectmysql');
class DoanhThuController{

    
        async doanhthu(req,res){
            
             con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ? ",[req.body.dayStart,req.body.dayEnd],
             function(err,relsut){
                if(err) throw err ;
                console.log("Total :" ,relsut[0].total);
                req.session.totalRevenue = relsut[0].total;
                res.redirect("/doanhthu")
             })   
        }
        
        
        async view(req,res){
            const totalRevenue = req.session.totalRevenue || 0;
            var date = new Date();
            var firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            var lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstDayThisYear = new Date(date.getFullYear(), 0, 1);
            var lastDayThisYear = new Date(date.getFullYear() + 1, 0, 0);
            con.query("SELECT sp.ten, sp.gia,SUM(ctn.soluong) AS total, asp.img "+
           " FROM chi_tiet_nhap ctn "+
           " JOIN san_pham sp ON ctn.masanpham = sp.id "+
            " JOIN anh_san_pham asp ON asp.masanpham = sp.id "+
            " GROUP BY ctn.masanpham "+
            " ORDER BY total DESC "+
            " LIMIT 10; ",function (err,data1) {
                if(err) throw err ;
                con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ?", [firstDayThisMonth, lastDayThisMonth],
                function(err, resultThisMonth){
                    if(err) throw err;
                    console.log("Total this month: ", resultThisMonth[0].total);
            
                    con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ?", [firstDayLastMonth, lastDayLastMonth],
                    function(err, resultLastMonth){
                        if(err) throw err;
                        console.log("Total last month: ", resultLastMonth[0].total);
            
                        con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ?", [today, today],
                        function(err, resultToday){
                            if(err) throw err;
                            console.log("Total today: ", resultToday[0].total);
            
                            con.query("SELECT SUM(tongtien) AS total FROM hoa_don_khach_hang WHERE thoigian BETWEEN ? AND ?", [firstDayThisYear, lastDayThisYear],
                            function(err, resultThisYear){
                                if(err) throw err;
                                con.query("SELECT  DATE_FORMAT(thoigian, '%Y-%m') AS Thang, " +
                               "SUM(tongtien) AS TongTien " +
                               "FROM hoa_don_khach_hang " +
                               "WHERE "+
                               "thoigian >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND "+
                               "thoigian < DATE_FORMAT(NOW(), '%Y-%m-01') " +
                               "GROUP BY Thang "+
                               " ORDER BY Thang DESC;",
                               
                               
                               function(err,relsultFiveMoth){
                                    if(err) throw err ;
                                    con.query("SELECT "+
                                    "SUM(CASE WHEN trangthai = 3 THEN 1 ELSE 0 END) AS total_3," +
                                    "SUM(CASE WHEN trangthai = 4 THEN 1 ELSE 0 END) AS total_4 " +
                                    "FROM hoa_don_khach_hang;",function(err,resultThisOder){
                                        if(err) throw err ;
                                        console.log("Total this year: ", resultThisYear[0].total);
                                        console.log("Total 5 thang: ", relsultFiveMoth);
                                        console.log("Da giao : ",resultThisOder[0].total_4)
                                        console.log("Da huy : ",resultThisOder[0].total_3)
                                    const dataFromDatabase = relsultFiveMoth ;
                                   
                                    res.render("doanhthu", {tongtienThangNay: resultThisMonth[0].total, tongtienToday: resultToday[0].total,
                                        tongtienYear :resultThisYear[0].total, data1:data1,data : dataFromDatabase , totalRevenue : totalRevenue,
                                        giao:resultThisOder[0].total_4 , huy:resultThisOder[0].total_3 })
                                    })


                                    
       
                                })
                            })   
                        })   
                    })   
                })   

               
            })
        }
      
   


}
module.exports = new DoanhThuController();