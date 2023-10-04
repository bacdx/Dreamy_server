const con = require('../../connect/connectmysql');
class LoginController{

     index(req,res) {
      console.log("hello");
      res.render('login');
    }


    async loginweb(req, res) {
       
        const{username,password}=req.body;
        console.log(username,password);

// con.connect(function(err) {
//     if (err) throw err;
//     console.log();
   
// git commit server_login-ph20234-2/10/2023
    
   con.query("select * from nhanvien where username like '" +username+ "' and matkhau like '"+password+"';",function(err,result,fields){

    const data=result[0]; 
       console.log(data);
     if(data!=undefined){
      if(data.username==username&&data.matkhau==password){
        res.redirect('/')
      }
     }else{
      res.render('login');
     }
    

        })
        
          
        res.render("login");
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
    
}

module.exports=new LoginController();