const weblogin=require('./weblogin');
const express=require('express');
const product=require('./product');
const api=require('./api');
const notification=require('./notification');
const category = require('./category');
const nsx = require("./nhasx");
const doanhthu = require("./doanhthu");
function route(app){
 


app.use('/login',weblogin);

app.use('/product',product);

app.use('/api',api);
app.use('/category',category);
app.use("/nsx",nsx)
app.use('/notification',notification);
app.use("/doanhthu",doanhthu);
app.get('/', function(req, res){
    res.render('home')

})
}





module.exports = route;