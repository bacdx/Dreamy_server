const weblogin=require('./weblogin');
const express=require('express');
const product=require('./product');

function route(app){
 


app.use('/login',weblogin);

app.use('/product',product);

app.get('/', function(req, res){
    res.render('home')
    
})
}





module.exports = route;