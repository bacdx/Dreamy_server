const con = require('../../connect/connectmysql');
var { validationResult } = require('express-validator');
class NhaSanXuatController{

        // view nsx
        async view(req,res){
            con.query("SELECT * FROM nha_san_xuat WHERE status = 1 ",function(err,data){
                if(err) throw err ;
                console.log(data);
                res.render("nsx",{data:data});
            })
            

        }

    // view add nsx
        async add(req,res){
            res.render('add-nsx')
        }

        // form add nsx
        async newCategory(req,res){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
            const name = req.body.name;
            const note = req.body.note;
            const numberphone = req.body.numberphone;
           const address = req.body.address;
            con.query("INSERT INTO nha_san_xuat SET name = ? , numberphone = ? , address = ? , note = ? , status = 1 ",[name,numberphone,address,note],function(err,relsut){
                if(err) throw err;
                console.log(relsut.insert);
                res.render("add-nsx",{alert:"Thêm nhà sản xuất thành công !"})
            })
        }
    // view edit nsx
    async edit(req,res){
        con.query("SELECT * FROM nha_san_xuat WHERE id = ?",[req.params.id],function(err,rows){
            if(err) throw err;
            res.render("edit-nsx",{rows});
        })
       
    }
    async editConfirm(req,res){
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
              return;
            }
        const name = req.body.name;
        const note = req.body.note;
        const numberphone = req.body.numberphone;
       const address = req.body.address;
       
        con.query("UPDATE nha_san_xuat SET name = ? , numberphone = ? , address = ? , note = ? WHERE id = ?",[name,numberphone,address,note , req.params.id],function(err,relsut){
            if(err) throw err;
            console.log(relsut.insert);
            res.render("edit-nsx",{alert:`${name} đã được cập nhật thành công !` })
        })
    }


    async delete(req,res){
        const ten = "Không xác định "
        con.query("UPDATE nha_san_xuat SET name = ? , status = 2 WHERE id = ? ",[ten,req.params.id],function(err,rows){
            if(err) throw err;
           
                    res.redirect("/nsx");
               
        })

    }

    async list(req,res){
        con.query("SELECT sp.*, MIN(asp.img) as img, lsp.ten  as ten_loai_san_pham ,nsx.name "+
        " FROM san_pham sp " +
        "JOIN anh_san_pham asp ON sp.id = asp.masanpham "+
        "JOIN loai_san_pham lsp ON sp.maloai = lsp.id "+
        "JOIN nha_san_xuat nsx ON sp.manhasanxuat = nsx.id "+
        "WHERE sp.status = 1 AND sp.manhasanxuat = ?" +
        "GROUP BY sp.id " +
        "ORDER BY sp.id DESC;",[req.params.id],function(err,data){
           if(err) throw err ;
           console.log(data);
           res.render("product",{data:data});
        })
    }


}
module.exports = new NhaSanXuatController();