const weblogin=require('./weblogin');
const express=require('express');
const product=require('./product');
const api=require('./api');

function route(app){
 


app.use('/login',weblogin);

app.use('/product',product);
app.use('/api',api);

app.get('/', function(req, res){
    res.render('home')
    
})
}





module.exports = route;