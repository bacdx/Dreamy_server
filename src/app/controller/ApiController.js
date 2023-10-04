const con = require('../../connect/connectmysql');
class ApiConController{
    index(req, res) {
        
        con.query("select  san_pham.ten,san_pham.soluong,san_pham.gia,nha_san_xuat.name,san_pham.ghichu from san_pham inner join nha_san_xuat on san_pham.manhasanxuat=nha_san_xuat.id  limit 20;", function (err, result, fields) {

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
                              
                console.log(data);
                res.send(data);

            }


        })


    }

}

module.exports=new LoginController();