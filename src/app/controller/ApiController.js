const con = require('../../connect/connectmysql');
class ApiConController {
    async getLoaiSanPham(req, res) {

        console.log(req.query);
        const query = req.query;
        const where = " ";
        if (Object.keys(query).length>0) {
            where+="where "
            if (query.ma_loai != undefined, query.ma_loai != null) {
                where += "ma_loai=" + query.ma_loai;
            }
            
        

            
        }
        const sql = "select  * from loai_san_pham  " + where + " ;";
               
        con.query(sql, function (err, result, fields) {

            const data = result;
        

            if (data == undefined) {
                const error = {
                    error: "Ko tim thay Loai san pham"
                }
                res.send(error);
            } else {


                res.send(data);

            }


        })

    }

    async getSanPham (req, res) {
        
        console.log(req.query);
        const query = req.query;
        const where = " ";
        if (Object.keys(query).length>0) {
            where+="where "
            if (query.ma_loai != undefined, query.ma_loai != null) {
                where += "ma_loai=" + query.ma_loai;
            }
            
          
        }

    
       
               
        con.query(sql, function (err, result, fields) {

            const data = result;
        

            if (data == undefined) {
                const error = {
                    error: "Ko tim thay Loai san pham"
                }
                res.send(error);
            } else {


                res.send(data);

            }


        })

    }

    async getColorbyMaSanPham(req,res){
            const query =req.query;
            if(Object.keys(query).length>0){
                if(query.masanpham!=undefined&&query.masanpham!=null){
                    const sql = "select * from color where masanpham="+ query.masanpham +";";
                    con.query(sql, function(err,result,fields){
                        res.render(result);
                    });
                    
                }
            }
    }

    async getSizeByMaSanPham(){
        const query =req.query;
        if(Object.keys(query).length>0){
            if(query.masanpham!=undefined&&query.masanpham!=null){
                const sql = "select * from size where masanpham="+ query.masanpham +";";
                con.query(sql, function(err,result,fields){
                    res.render(result);
                });
                
            }
        }
    }

    async getCommentsByMaSanPham(){
        const query =req.query;
        if(Object.keys(query).length>0){
            if(query.masanpham!=undefined&&query.masanpham!=null){
                const sql = "select * from binh_luan where masanpham ="+  query.masanpham +";";
                con.query(sql, function(err,result,fields){
                    res.render(result);
                });
                
            }
        }
    }
    async getContentsByMaBinhLuan(){
        const query =req.query;
        if(Object.keys(query).length>0){
            if(query.masanpham!=undefined&&query.mabinhluan!=null){
                const sql = "select * from binh_luan where mabinhluan ="+  query.mabinhluan +";";
                con.query(sql, function(err,result,fields){
                    res.render(result);
                });
                
            }
        }
    }



    async getSanPhams(req, res) {

        console.log(req.query);
        const query = req.query;
        const where = "where ";
        if (!isEmpty(query)) {

            if (query.ma_loai != undefined, query.ma_loai != null) {
                where += "ma_loai=" + query.ma_loai;
            }
            
           

                const sql = "select san_pham.id,san_pham.ten,san_pham.soluong,san_pham.gia from san_pham inner join nha_san_xuat on san_pham.manhasanxuat=nha_san_xuat.id  " + where + "  limit 20;";
               
                con.query(sql, function (err, result, fields) {

                    const data = result;
                    data.forEach(element => {
                        element.anh_dai_dien = blobtoBase64(element.anh_dai_dien)
                    });



                    if (data == undefined) {
                        const error = {
                            error: "Product not found"
                        }
                        res.send(error);
                    } else {


                        res.send(data);

                    }


                })


            
        }
    }


}

module.exports = new ApiConController();