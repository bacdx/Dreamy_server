const con = require('../../connect/connectmysql');
class NhaSanXuatController{

        // view nsx
        async view(req,res){
            con.query("SELECT * FROM nha_san_xuat",function(err,data){
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
            const name = req.body.name;
            const note = req.body.note;
            const numberphone = req.body.numberphone;
           const address = req.body.address;
            con.query("INSERT INTO nha_san_xuat SET name = ? , numberphone = ? , address = ? , note = ? ",[name,numberphone,address,note],function(err,relsut){
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
        con.query("SELECT * FROM san_pham WHERE manhasanxuat = ?",[req.params.id],function(err,rows){
            if(err) throw err;
            if(rows.length==0){
                con.query("DELETE FROM nha_san_xuat WHERE id = ?",[req.params.id],function(err,relsut){
                    if(err) throw err;
                    res.redirect("/nsx");
                })
            }else{
                res.send("Không thể xóa nhà sản xuất này vì có sản phẩm liên quan."); 
            }
        })

    }



}
module.exports = new NhaSanXuatController();