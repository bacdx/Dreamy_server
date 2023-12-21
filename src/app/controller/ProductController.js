const { log } = require('console');
const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
var { formidable } = require('formidable');
var fs = require('fs');
class ProductController {
    async view(req,res){
        con.query("SELECT sp.*, MIN(asp.img) as img, lsp.ten  as ten_loai_san_pham ,nsx.name "+
   " FROM san_pham sp " +
   "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
   "JOIN loai_san_pham lsp ON sp.maloai = lsp.id "+
   "JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id "+
   "GROUP BY sp.id;",function(err,data){
       if(err) throw err ;
       console.log(data);
       res.render("product",{data:data});
})

    }
    async find(req,res){
        let sreach = req.body.search;
        con.query("SELECT sp.*, MIN(asp.img) as img, lsp.ten  as ten_loai_san_pham ,nsx.name "+
        " FROM san_pham sp " +
        "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
        "JOIN loai_san_pham lsp ON sp.maloai = lsp.id "+
        "JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id "+
        "Where sp.ten LIKE ?",['%'+sreach+"%"]+
        "GROUP BY sp.id;",function(err,data){
            if(err) throw err ;
            console.log(data);
            res.render("product",{data:data});
     })
    }
   async form(req,res){
    con.query("SELECT * FROM nha_san_xuat", function(err, result1) {
        if(err) throw err;
        con.query("SELECT * FROM loai_san_pham", function(err, result2) {
          if(err) throw err;
          res.render("addproduct", {nhaSanXuat: result1, loaiSanPham: result2});
        });
      });
      
  
   }
   async addPro(req,res){
        const ten = req.body.ten;
        const manhasanxuat = req.body.manhasanxuat;
        const maloai = req.body.maloai;
        const ngaynhap = req.body.ngaynhap;
    
        const ghichu = req.body.ghichu;
        const gia =req.body.gia;
        con.query("INSERT INTO san_pham SET ten = ? , manhasanxuat = ? , maloai = ? , ngaynhap = ? , ghichu = ? , gia = ?",[ten,manhasanxuat,maloai,ngaynhap,ghichu,gia],function(err,rows){
            if(err) throw err;
            console.log(rows.insert);
            res.render("add-img",{sanpham: {id: rows.insertId, ten: ten, manhasanxuat: manhasanxuat, maloai: maloai, ngaynhap: ngaynhap, ghichu: ghichu, gia: gia}})
        })
   }
   async addimg(req,res){
    var masanpham = req.body.masanpham;
    var imgs = req.body.img;
    // Lặp qua mảng imgs và xử lý từng link ảnh
    imgs.forEach(function(img) {
      // Lưu link ảnh vào cơ sở dữ liệu
      con.query("INSERT INTO anh_san_pham SET masanpham = ?, img = ?", [masanpham, img], function(err, result) {
        if(err) throw err;
        console.log(result);
      });
    });
    res.redirect('/product');
   }
   async edit(req,res){
    con.query("SELECT * FROM san_pham WHERE id = ?",[req.params.id],function(err,relsut){
        if(err) throw err ;
        con.query("SELECT * FROM nha_san_xuat", function(err, result1) {
            if(err) throw err;
            con.query("SELECT * FROM loai_san_pham", function(err, result2) {
              if(err) throw err;
              res.render("edit-pro", {nhaSanXuat: result1, loaiSanPham: result2 , relsut});
            });
          });
    })
   
   }
   async editfirm(req,res){
   
    const ten = req.body.ten;
    const ngaynhap = req.body.ngaynhap;
    const ghichu = req.body.ghichu;
    const gia =req.body.gia;
    con.query("UPDATE san_pham SET ten = ? , ngaynhap = ? , ghichu = ? , gia = ? WHERE id = ?",[ten,ngaynhap,ghichu,gia,req.params.id],function(err,relsut){
        if(err) throw err;
        res.redirect("/product");
    })
   }

   async delete(req, res) {
    // Kiểm tra xem có chi tiết nhập nào cho sản phẩm này không
    con.query("SELECT * FROM chi_tiet_nhap WHERE masanpham = ?", [req.params.id], function(err, result) {
      if(err) throw err;
      // Nếu không có chi tiết nhập nào, tiến hành xóa sản phẩm và các dữ liệu liên quan
      if(result.length === 0) {
        // Xóa dữ liệu từ bảng size, anh_san_pham, color
        con.query("DELETE FROM size WHERE masp = ?", [req.params.id], function(err, result) {
          if(err) throw err;
        });
        con.query("DELETE FROM anh_san_pham WHERE masanpham = ?", [req.params.id], function(err, result) {
          if(err) throw err;
        });
        con.query("DELETE FROM color WHERE masp = ?", [req.params.id], function(err, result) {
          if(err) throw err;
        });
        // Cuối cùng, xóa sản phẩm
        con.query("DELETE FROM san_pham WHERE id = ?", [req.params.id], function(err, result) {
          if(err) throw err;
          res.redirect("/product");
        });
      } else {
        // Nếu có chi tiết nhập, thông báo cho người dùng
        res.send("Không thể xóa sản phẩm này vì có chi tiết nhập liên quan.");
      }
    });
  }
  
    

  //// -------------------------------------------- color ------------------------------------------------------///

  // view list color
   async color(req,res){

    con.query("SELECT * FROM color WHERE masp = ?",[req.params.id],function(err,data){
      if(err) throw err ;
      console.log(data);
      res.render("color",{data:data ,masp :{id : req.params.id}});
    })
   }

   // view add color 
   async addColor(req,res){
    const id = req.params.id;
    console.log(id);
     res.render('add-color',{masp :{id : req.params.id}})
   }

   // form add color
   async formColor(req,res){
    const title = req.body.title ;
    const mamau = req.body.mamau ;
    const masp = req.body.masp;
    con.query("INSERT INTO color SET masp = ? , title = ? , mamau = ?",[masp,title,mamau],function(err,rows){
      if(err) throw err ;
    
       
        res.render('add-color', {masp: {id: masp}});
      
    })
   }

   // view sua color 
   async editColor(req,res){
      con.query("SELECT * FROM color WHERE id = ? ",[req.params.id],
      function(err,rows){
        if(err) throw err ;
        res.render('edit-color', {rows});
      })

   }

   // form sua color 
   async editcolorFirm(req,res){
    const title = req.body.title ;
    const mamau = req.body.mamau ;
    const masp = req.body.masp;
    con.query("UPDATE color SET masp = ? , title = ? , mamau = ? WHERE id = ? ",[masp,title,mamau , req.params.id],function(err,rows){
      if(err) throw err ;
    
      res.render('add-color', {alert:`${title} đã được cập nhật thành công !`});
      
    })
   }

   // xoa color
   async deleteColor(req,res){
 
    con.query("DELETE FROM color WHERE id = ?",[req.params.id],function(err,relsut){
                if(err) throw err;
                res.send("Da xoa color thanh cong")
            })
       
    }

}
   
   
   /// ---------------------- end color ----------------------------------------------------------------------------//
   
   
  






module.exports = new ProductController();