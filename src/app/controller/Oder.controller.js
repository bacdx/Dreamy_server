const con = require('../../connect/connectmysql');
class OderController{

    
        
        
        async view(req,res){
            const confirm = req.session.mesenger || 0;
            con.query('SELECT  hd.* , kh.username ,  sp.ten , cthd.soluong, '+
                        'sz.title AS size_title , cl.title AS color_title ' +
                        'FROM hoa_don_khach_hang hd '+
                        'JOIN chi_tiet_hoa_don cthd ON hd.id = cthd.mahoadon '+
                        'JOIN khachhang kh ON hd.makhachhang = kh.id '+
                        'JOIN chi_tiet_san_pham ctsanpham ON cthd.mactsanpham = ctsanpham.id '+
                        'JOIN san_pham sp ON ctsanpham.masanpham = sp.id '+
                        'JOIN size sz ON ctsanpham.masize = sz.id '+
                        'JOIN color cl ON ctsanpham.mamau = cl.id '+
                        'WHERE hd.trangthai = 0;',function(err,relsult){
                            if(err) throw err ;
                                console.log("Total :" ,relsult);
                               
                                res.render("oder",{relsult:relsult,confirm : confirm})
                        })
        }
      
        // xác nhận đơn hàng
        async confirm(req,res){
            
            con.query("UPDATE hoa_don_khach_hang SET trangthai = 1 WHERE id=? and trangthai = 0",[req.params.id],
            function(err,relsut){
               if(err) throw err ;
             
               req.session.mesenger = 'Xác nhận đơn hàng thành công';
               res.redirect("/oder") 
            })   
       }

       
    //   hủy đơn hàng 
       async cancel(req,res){
            
        con.query("UPDATE hoa_don_khach_hang SET trangthai = 3 WHERE id = ?",[req.params.id],
        function(err,relsut){
          
           req.session.mesenger = 'Hủy đơn hàng thành công';
           res.redirect("/oder")
        })   
  }
   


}
module.exports = new OderController();