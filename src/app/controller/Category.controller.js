const con = require('../../connect/connectmysql');
var { validationResult } = require('express-validator');
class CategoryController{

        // view category
        async view(req,res){
            con.query("SELECT * FROM loai_san_pham WHERE status = 1 ",function(err,data){
                if(err) throw err ;
                console.log(data);
                res.render("category",{data:data});
            })
            

        }

    // view add category
        async add(req,res){
            res.render('add-category')
        }

        // form add category
        async newCategory(req,res){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
            const ten = req.body.ten;
            const note = req.body.note;
            const img = req.body.img;
           
            con.query("INSERT INTO loai_san_pham SET ten = ? , note = ? , img = ? , status = 1",[ten,note,img],function(err,relsut){
                if(err) throw err;
                console.log(relsut.insert);
                res.render("add-category",{alert:"Thêm loại SP thành công !"})
            })
        }
    // view edit categoty
    async edit(req,res){
        con.query("SELECT * FROM loai_san_pham WHERE id = ?",[req.params.id],function(err,rows){
            if(err) throw err;
            res.render("edit-category",{rows});
        })
       
    }
    async editConfirm(req,res){
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
        const ten = req.body.ten;
        const note = req.body.note;
        const img = req.body.img;
       
        con.query("UPDATE loai_san_pham SET ten = ? , note = ? , img = ?  WHERE id = ? ",[ten,note,img,req.params.id],function(err,relsut){
            if(err) throw err;
            console.log(relsut.insert);
            res.render("edit-category",{alert:`${ten} đã được cập nhật thành công !` })
        })
    }
    async delete(req,res){
        const ten = "Không xác định";
        con.query("UPDATE loai_san_pham SET ten = ? , status = 2 WHERE id = ?",[ten, req.params.id],function(err,rows){
            if(err) throw err;
            req.session.message = 'Ẩn loại sản phẩm thành công';
            res.redirect("/category");
             
        })

    }

// danh sach theo loai sp
    async list(req,res){
        con.query("SELECT sp.*, MIN(asp.img) as img, lsp.ten  as ten_loai_san_pham ,nsx.name "+
        " FROM san_pham sp " +
        "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
        "JOIN loai_san_pham lsp ON sp.maloai = lsp.id "+
        "JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id "+
        "WHERE sp.status = 1 AND sp.maloai = ?" +
        "GROUP BY sp.id " +
        "ORDER BY sp.id DESC;",[req.params.id],function(err,data){
           if(err) throw err ;
           console.log(data);
           res.render("product",{data:data});
        })
    }

}
module.exports = new CategoryController();