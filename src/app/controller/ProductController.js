const { log } = require('console');
const con = require('../../connect/connectmysql');
const { bytetoBase64, base64toBolb, getKey } = require('../../untl')
var { formidable } = require('formidable');
var fs = require('fs');
var { validationResult } = require('express-validator');
class ProductController {



  async viewAllPro(req,res){
        con.query('SELECT sp.*,  lsp.ten  as ten_loai_san_pham , nsx.name , '+
        'GROUP_CONCAT(DISTINCT sz.title) AS sizes, '+
        'GROUP_CONCAT(DISTINCT cl.title) AS colors,'+
        'ctsanpham_total.total_soluong '+
        'FROM san_pham sp '+
        'JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id '+
        'JOIN loai_san_pham lsp ON sp.maloai = lsp.id '+
        'JOIN ( '+
        '       SELECT masanpham, SUM(soluong) AS total_soluong '+
        '       FROM chi_tiet_san_pham ' +
        '       GROUP BY masanpham '+
        ') ctsanpham_total ON sp.id = ctsanpham_total.masanpham '+
        'JOIN chi_tiet_san_pham ctsanpham ON sp.id = ctsanpham.masanpham '+
        'JOIN size sz ON ctsanpham.masize = sz.id '+
        'JOIN color cl ON ctsanpham.mamau = cl.id '+
        'WHERE sp.id = ? ' +
        'GROUP BY sp.id;' ,[req.params.id],function(err,result){
          if(err) throw err ;
          console.log(result);
          con.query("SELECT * FROM anh_san_pham WHERE masanpham = ?",[req.params.id],function(err,result1){
            if(err) throw err ;
            console.log(result1);
            con.query(' SELECT SUM(chi_tiet_hoa_don.soluong)  AS total_soluong '+
            'FROM chi_tiet_hoa_don '+
            'JOIN chi_tiet_san_pham ON chi_tiet_hoa_don.mactsanpham = chi_tiet_san_pham.id '+
            'JOIN hoa_don_khach_hang ON chi_tiet_hoa_don.mahoadon = hoa_don_khach_hang.id '+
            'WHERE chi_tiet_san_pham.masanpham = ? AND hoa_don_khach_hang.trangthai = 5; '
            ,[req.params.id],function(err,result2){
              if(err) throw err ;
              console.log("Total :" ,result2[0].total_soluong);
              console.log("img :" ,result1[0].img);
              con.query("SELECT  bl.* , kh.hoten   FROM binh_luan bl "+
              "JOIN khachhang kh ON bl.makhachhang = kh.id "+
              "where bl.masanpham = ? ;",[req.params.id],function(err,result3){
                if(err) throw err ;
                console.log("bl :" ,result3);
                res.render('product-view',{result:result,result1:result1,result2:result2[0].total_soluong , img : result1[0].img,binhluan : result3})
              })
                
              
             
            })
          })
          
        })
  }
  async view(req,res){
    con.query("SELECT sp.*, MIN(asp.img) as img, lsp.ten  as ten_loai_san_pham ,nsx.name "+
" FROM san_pham sp " +
"LEFT JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
"JOIN loai_san_pham lsp ON sp.maloai = lsp.id "+
"JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id "+
"WHERE sp.status = 1 " +
"GROUP BY sp.id " +
"ORDER BY sp.id DESC;",function(err,data){
   if(err) throw err ;
   console.log(data);
   res.render("product",{data:data});
})
}

   
   async form(req,res){
    con.query("SELECT * FROM nha_san_xuat WHERE status = 1", function(err, result1) {
        if(err) throw err;
        con.query("SELECT * FROM loai_san_pham WHERE status = 1", function(err, result2) {
          if(err) throw err;
          res.render("addproduct", {nhaSanXuat: result1, loaiSanPham: result2});
        });
      });
      
  
   }
   async addPro(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
        const ten = req.body.ten;
        const manhasanxuat = req.body.manhasanxuat;
        const maloai = req.body.maloai;
        const ngaynhap = req.body.ngaynhap;
    
        const ghichu = req.body.ghichu;
        const gia =req.body.gia;
        con.query("INSERT INTO san_pham SET ten = ? , manhasanxuat = ? , maloai = ? , ngaynhap = ? , ghichu = ? , gia = ? , status = 1  , favorite = 1",[ten,manhasanxuat,maloai,ngaynhap,ghichu,gia],function(err,rows){
            if(err) throw err;
            console.log(rows.insert);
            res.render("add-img",{sanpham: {id: rows.insertId, ten: ten, manhasanxuat: manhasanxuat, maloai: maloai, ngaynhap: ngaynhap, ghichu: ghichu, gia: gia}})
        })
   }
   async addimg(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
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
    res.render("add-sizes",{sanpham :{id:masanpham}});
   }
   async addSizes(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    var masanpham = req.body.masanpham;
    var titles = req.body.title;
    // Lặp qua mảng imgs và xử lý từng link ảnh
    titles.forEach(function(title) {
      // Lưu link ảnh vào cơ sở dữ liệu
      con.query("INSERT INTO size SET masp = ?, title = ?", [masanpham, title], function(err, result) {
        if(err) throw err;
        console.log(result);
      });
    });
    res.render("add-colors",{sanpham:{id : masanpham}})
   }
   async addColors(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    var masp = req.body.masp;
    var titles = req.body.title;
    var imgs = req.body.img
    for(let i = 0; i < titles.length; i++) {
      let title = titles[i];
      let img = imgs[i];
      con.query("INSERT INTO color SET masp = ?, title = ?, img = ?", [masp, title, img], function(err, result) {
          if(err) throw err;
         
      });
  }
   
    res.redirect("/product")
   }
   //------------------------------------- varinat --------------------------------//
    // view list color
    async variant(req,res){

      con.query("SELECT chi_tiet_san_pham.*, color.title AS color_title, size.title AS size_title "+
      "FROM chi_tiet_san_pham "+
      "JOIN color ON chi_tiet_san_pham.mamau = color.id "+
      "JOIN size ON chi_tiet_san_pham.masize = size.id "+
      "WHERE chi_tiet_san_pham.masanpham = ?;",[req.params.id],function(err,data){
        if(err) throw err ;
        console.log(data);
        res.render("variant",{data:data ,masp :{id : req.params.id}});
      })
     }

     async addVariant(req,res){
  
      con.query("SELECT * FROM size WHERE masp =  ?" ,[req.params.id], function(err, result1) {
        if(err) throw err;
        con.query("SELECT * FROM color WHERE masp = ?" ,[req.params.id], function(err, result2) {
          if(err) throw err;
          console.log(result1,result2)
          res.render("add-variant", {size: result1, color: result2 ,masp: {id: req.params.id}});
        });
      });
     }
     async addVariantForm(req,res){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
        const masanpham = req.body.masanpham;
        const masize = req.body.masize;
        const mamau = req.body.mamau;
        const soluong = req.body.soluong;
       
        con.query(
          "INSERT INTO chi_tiet_san_pham SET masanpham = ?, masize = ?, mamau = ?, soluong = ?, dongia = 1",
          [masanpham, masize, mamau, soluong],
          function (err, relsut) {
            if (err) throw err;
            console.log(relsut);
            con.query("SELECT * FROM size WHERE masp =  ?", [masanpham], function (
              err,
              result1
            ) {
              if (err) throw err;
              con.query("SELECT * FROM color WHERE masp = ?", [masanpham], function (
                err,
                result2
              ) {
                if (err) throw err;
                console.log(result1, result2);
                res.render("add-variant", {
                  size: result1,
                  color: result2,
                  masp: { id: masanpham },
                  alert:`Thêm biến thể thành công !`
                });
              });
            });
          }
        );
        
        
      
     }
     async viewEditVariant(req,res){
      con.query("SELECT * from chi_tiet_san_pham where id = ?",[req.params.id],function(err,relsut){
        if(err) throw err;
            console.log({variant : relsut})
            res.render("edit-variant", {variant : relsut});
       
      })
      
     }
     async editVariant(req,res){
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      con.query("UPDATE chi_tiet_san_pham SET soluong = ? WHERE id = ?",[req.body.soluong,req.params.id],function(err,relsut){
        if(err) throw err;
            res.render("edit-variant", {alert:` Cập nhật số lượng thành công !` });
       
      })
     }
     async deleteVariant(req,res){
      con.query("DELETE FROM chi_tiet_san_pham WHERE id = ?",[req.params.id],function(err,relsut){
        if(err) throw err;
            res.status(200).send("Xoa bien the thanh cong");
       
      })
     }
     
 //-------------------------------------end varinat --------------------------------//
   async edit(req,res){
    con.query("SELECT * FROM san_pham WHERE id = ?",[req.params.id],function(err,relsut){
        if(err) throw err ;
        con.query("SELECT * FROM nha_san_xuat WHERE status = 1", function(err, result1) {
            if(err) throw err;
            con.query("SELECT * FROM loai_san_pham WHERE status = 1", function(err, result2) {
              if(err) throw err;
              res.render("edit-pro", {nhaSanXuat: result1, loaiSanPham: result2 , relsut});
            });
          });
    })
   
   }
   async editfirm(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const ten = req.body.ten;
    const ngaynhap = req.body.ngaynhap;
    const ghichu = req.body.ghichu;
    const gia =req.body.gia;
    const manhasanxuat = req.body.manhasanxuat;
    const maloai = req.body.maloai;
    con.query("UPDATE san_pham SET ten = ? , ngaynhap = ? , ghichu = ? , gia = ? , manhasanxuat = ? , maloai = ?  WHERE id = ?",[ten,ngaynhap,ghichu,gia,manhasanxuat,maloai,req.params.id],function(err,relsut){
        if(err) throw err;
        res.redirect("/product");
    })
   }

   async delete(req, res) {
    
    con.query("UPDATE san_pham SET status = 2 WHERE id = ?", [req.params.id], function(err, result) {
      if(err) throw err;
      
      res.redirect("/product");
       
     
    });
  }
  //---------------------------------img---------------------------------//
  async editImg(req,res){
    con.query("SELECT * FROM anh_san_pham WHERE masanpham = ?",[req.params.id],function(err,relsut){
      if(err) throw err;
      console.log(relsut)
      res.render("edit-img",{relsut})
    })
  }
  async editImgfirm(req,res){
    con.query("SELECT * FROM anh_san_pham WHERE id = ?",[req.params.id],function(err,relsut){
      if(err) throw err;
      console.log(relsut)
      res.render("edit-imgPro",{relsut})
    })
     
  }
  async editFormImg(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    con.query("UPDATE anh_san_pham SET img = ? WHERE id = ?",[req.body.img,req.params.id],function(err,relsut){
      if(err) throw err;
      console.log(relsut)
      res.render("edit-imgPro",{alert:`Ảnh đã được cập nhật thành công`})
    })
  }
  //------------------------------end Img----------------------------------------///
    

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
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    const title = req.body.title ;
    const img = req.body.img ;
    const masp = req.body.masp;
    con.query("INSERT INTO color SET masp = ? , title = ? , img = ?",[masp,title,img],function(err,rows){
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
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    const title = req.body.title ;
    const img = req.body.img ;
    const masp = req.body.masp;
    con.query("UPDATE color SET masp = ? , title = ? , img = ? WHERE id = ? ",[masp,title,img , req.params.id],function(err,rows){
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


     /// ---------------------- end color ----------------------------------------------------------------------------//
   
   
  /// ----------------------- size ---------------------------------------------------------------------------------// 
  async size(req,res){

    con.query("SELECT * FROM size WHERE masp = ?",[req.params.id],function(err,data){
      if(err) throw err ;
      console.log(data);
      res.render("size",{data:data ,masp :{id : req.params.id}});
    })
   }

    // view add size 
    async addSize(req,res){
      const id = req.params.id;
      console.log(id);
       res.render('add-size',{masp :{id : req.params.id}})
    }
     // form add size
   async formSize(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    const title = req.body.title ;
    const masp = req.body.masp;
    con.query("INSERT INTO size SET masp = ? , title = ? ",[masp,title],function(err,rows){
      if(err) throw err ;
    
       
        res.render('add-size', {masp: {id: masp}, alert:`Thêm size thành công !`});
      
    })
   }
   async editSize(req,res){
    con.query("SELECT * FROM size WHERE id = ? ",[req.params.id],
    function(err,rows){
      if(err) throw err ;
      res.render('edit-size', {rows});
    })

 }

  // form sua color 
  async editSizeFirm(req,res){
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
    const title = req.body.title ;
    const masp = req.body.masp;
    con.query("UPDATE size SET masp = ? , title = ?  WHERE id = ? ",[masp,title,  req.params.id],function(err,rows){
      if(err) throw err ;
    
      res.render('add-size', {alert:`${title} đã được cập nhật thành công !`,masp: {id: masp}});
      
    })
   }
   async deleteSize(req,res){
 
    con.query("DELETE FROM size WHERE id = ?",[req.params.id],function(err,relsut){
                if(err) throw err;
                res.send("Da xoa size thanh cong")
            })
       
    }





}
   
   
  




module.exports = new ProductController();