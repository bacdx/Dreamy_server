const weblogin=require('./weblogin');
const express=require('express');
const product=require('./product');
const api=require('./api');
const notification=require('./notification');
const received=require('./received');

function route(app){
 

app.use('/login',weblogin);

app.use('/product',product);

app.use('/api',api);

app.use('/api',received);

app.use('/notification',notification);

app.get('/', function(req, res){
    res.render('home')

})
}





module.exports = route;