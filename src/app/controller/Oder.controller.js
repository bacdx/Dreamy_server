const con = require('../../connect/connectmysql');
class OderController{

    
        
        
        async view(req,res){
            const confirm = req.session.mesenger || 0;
            con.query('SELECT  hd.* , kh.username '+
                       'FROM hoa_don_khach_hang hd '+
                        'JOIN khachhang kh ON hd.makhachhang = kh.id '+

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
               res.redirect("/oder/confirm") 
            })   
       }
        // Vận chuyển đơn hàng
        async confirmDelivering(req,res){
            
         con.query("UPDATE hoa_don_khach_hang SET trangthai = 2 WHERE id = ?",[req.params.id],
         function(err,relsut){
            if(err) throw err ;
          
            res.redirect("/oder/delivering") 
         })   
    }

       
    //   hủy đơn hàng 
       async cancel(req,res){
            
        con.query("UPDATE hoa_don_khach_hang SET trangthai = 4 WHERE id = ?",[req.params.id],
        function(err,relsut){
            if(err) throw err ;
            con.query("UPDATE chi_tiet_san_pham "+
                "SET soluong = soluong + ( "+
                "SELECT SUM(chi_tiet_hoa_don.soluong) "+
                "FROM chi_tiet_hoa_don "+
                "INNER JOIN hoa_don_khach_hang ON hoa_don_khach_hang.id = chi_tiet_hoa_don.mahoadon "+
                "WHERE hoa_don_khach_hang.id = ? AND chi_tiet_san_pham.id = chi_tiet_hoa_don.mactsanpham "+
                ") "+
                "WHERE id IN ( "+
                "SELECT mactsanpham "+
                " FROM chi_tiet_hoa_don "+
                "INNER JOIN hoa_don_khach_hang ON hoa_don_khach_hang.id = chi_tiet_hoa_don.mahoadon "+
                "WHERE hoa_don_khach_hang.id = ? "+
                ")",[req.params.id,req.params.id],function(err,result){
                    if(err) throw err ;
                    req.session.mesenger = 'Hủy đơn hàng thành công';
                    res.redirect("/oder/cancel")
                })
           
        })   
      }

      // render view đã hủy đơn hàng
      async viewCancel(req,res){
         const confirm = req.session.mesenger || 0;
         con.query('SELECT  hd.* , kh.username '+
                    'FROM hoa_don_khach_hang hd '+
                     'JOIN khachhang kh ON hd.makhachhang = kh.id '+
                     'WHERE hd.trangthai = 4;',function(err,relsult){
                         if(err) throw err ;
                             console.log("Total :" ,relsult);
                            
                             res.render("cancel-oder",{relsult:relsult,confirm : confirm})
                     })
           
       }
       // render view đã xác nhận đơn hàng
       async viewConfirm(req,res){
         const confirm = req.session.mesenger || 0;
            con.query('SELECT  hd.* , kh.username '+
                       'FROM hoa_don_khach_hang hd '+
                        'JOIN khachhang kh ON hd.makhachhang = kh.id '+
                        'WHERE hd.trangthai = 1;',function(err,relsult){
                            if(err) throw err ;
                                console.log("Total :" ,relsult);
                               
                                res.render("confirm-oder",{relsult:relsult,confirm : confirm})
                        })
    
           
       }
       // render view đang giao hàng
       async viewDelivering(req,res){
         const confirm = req.session.mesenger || 0;
            con.query('SELECT  hd.* , kh.username '+
                       'FROM hoa_don_khach_hang hd '+
                        'JOIN khachhang kh ON hd.makhachhang = kh.id '+
                        'WHERE hd.trangthai = 2;',function(err,relsult){
                            if(err) throw err ;
                                console.log("Total :" ,relsult);
                               
                                res.render("delivering-oder",{relsult:relsult,confirm : confirm})
                        })
    
           
       }

       // render view đã giao hàng
       async viewDelivered(req,res){
         const confirm = req.session.mesenger || 0;
            con.query('SELECT  hd.* , kh.username '+
                       'FROM hoa_don_khach_hang hd '+
                        'JOIN khachhang kh ON hd.makhachhang = kh.id '+
                        'WHERE hd.trangthai = 3;',function(err,relsult){
                            if(err) throw err ;
                                console.log("Total :" ,relsult);
                               
                                res.render("delivered-oder",{relsult:relsult,confirm : confirm})
                        })
    
           
       }
       

       // view chi tiết đơn hàng 
       async detailOder(req,res){
        
            con.query('SELECT   cthd.*, '+
                       'sz.title AS size_title ,  cl.title AS color_title,'+
                        'sp.ten AS san_pham_ten ,sp.gia AS san_pham_gia,lsp.ten AS ten_loai_sp, asp.img AS anh_san_pham_img ,ctsanpham.id AS id_ctsp '+
                        'FROM chi_tiet_hoa_don cthd '+
                        'JOIN chi_tiet_san_pham ctsanpham ON cthd.mactsanpham = ctsanpham.id '+
                        'JOIN  size sz ON ctsanpham.masize = sz.id '+
                        'JOIN  color cl ON ctsanpham.mamau = cl.id '+
                        'JOIN san_pham sp ON ctsanpham.masanpham = sp.id '+
                        'JOIN loai_san_pham lsp ON sp.maloai = lsp.id '+
                        'JOIN '+
                        '(SELECT masanpham, MIN(img) as img FROM anh_san_pham GROUP BY masanpham) asp ON sp.id = asp.masanpham '+
                        'WHERE cthd.mahoadon = ?;',[req.params.id],function(err,relsult){
                            if(err) throw err ;
                                console.log("Total :" ,relsult);
                               
                                res.render("detail-oder",{relsult:relsult})
                        })
    
           
       }
       // đã giao xong hàng
       async done(req,res){
        con.query("UPDATE hoa_don_khach_hang SET trangthai = 3 WHERE id = ?",[req.params.id],
        function(err,relsut){
          
           req.session.mesenger = 'Hủy đơn hàng thành công';
           res.redirect("/oder/delivered")
        })  
   
          
      }
   


}
module.exports = new OderController();