const con = require('../../connect/connectmysql');
class CategoryController{

        // view category
        async view(req,res){
            con.query("SELECT * FROM loai_san_pham",function(err,data){
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
            const ten = req.body.ten;
            const note = req.body.note;
            const img = req.body.img;
           
            con.query("INSERT INTO loai_san_pham SET ten = ? , note = ? , img = ? ",[ten,note,img],function(err,relsut){
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
        con.query("SELECT * FROM san_pham WHERE maloai = ?",[req.params.id],function(err,rows){
            if(err) throw err;
            if(rows.length==0){
                con.query("DELETE FROM loai_san_pham WHERE id = ?",[req.params.id],function(err,relsut){
                    if(err) throw err;
                    res.redirect("/category");
                })
            }else{
                res.send("Không thể xóa loại sản phẩm này vì có sản phẩm liên quan."); 
            }
        })

    }



}
module.exports = new CategoryController();