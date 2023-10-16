const con = require('../../connect/connectmysql');
class ApiConController {
    async getLoaiSanPham(req, res) {

        const query = req.query;
        if (Object.keys(query).length>0) {
          
            if (query.ma_loai != undefined, query.ma_loai != null) {
                const sql = "select  * from loai_san_pham  where id=? ;";
               
                con.query(sql,[query.ma_loai], function (err, result, fields) {
        
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
            
        

            
        }
       
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
                        if(err) throw res.json(err);
                        res.json(result)
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
                    if(err) throw res.json(err);
                    res.json(result)
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
                    if(err) throw res.json(err);
                    res.json(result)
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
                        res.json(error);
                    } else {


                        res.json(data);

                    }


                })


            
        }
    }
    async getHoaDonKhachHang(req, res, next) {
       const maKhachHang =req.query.id;
       if(maKhachHang == undefined||maKhachHang==null) return res.send(404);
       const sql="select * from hoa_don_khach_hang where id";
       
       con.query(sql,[maKhachHang],function(err,results,fields){
         if(err)throw err;
         res.json(results);
            })
            //getchitiethoadon
    }
    async getChiTietHoaDonKhachHang(req, res, next) {
        const maHoaDon =req.query.id;
        const sql="select * from chi_tiet_hoa_don_khach_hang where id=?";
       
        con.query(sql,[maHoaDon],function(err,results,fields){
                res.json(results)

             })
 
 
             //getchitiethoadon 

 
     }


}

module.exports = new ApiConController();