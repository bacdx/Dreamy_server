const con = require('../../connect/connectmysql');
class LoginController{

     index(req,res) {
      console.log("hello");
      res.render('login');
    }


    async loginweb(req, res) {
       
        const{username,password}=req.body;
        console.log(username,password);
    
        con.query("select * from nhanvien where username like '" +username+ "' and matkhau like '"+password+"';",function(err,result,fields){

       const data=result[0]; 
       console.log(data);
      if(data!=undefined){
      if(data.username==username&&data.matkhau==password){

        req.session.user={
          username: username,
          isAuthenticated: true
        }
        res.redirect("/product");
       
n
      }
     }else{
      res.redirect('/login')
     }
    

        })
        
        
    }



    async loginapp(req, res) {
       
        const{username,password}=req.body;
        console.log(username,password);


    
   con.query("select * from khachhang where username like '" +username+ "' and matkhau like '"+password+"';",function(err,result,fields){

    const data=result[0]; 
       console.log(data);
       if(data.username==username&&data.password==password){
        res.send(data);
       }else{
        const err={
          error: "Invalid username or password"
        }
        res.send(err);
       }
     
        })
      
    }
    async logout(req,res){
      req.session.destroy(err => {
        if (err) {
            // Xử lý lỗi nếu cần
            console.log(err);
        }

        // Chuyển hướng người dùng về trang đăng nhập
        res.redirect('/login');
    });
    }
    
}

module.exports=new LoginController();