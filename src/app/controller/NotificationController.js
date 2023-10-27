const con = require('../../connect/connectmysql');
class NotificationController {

     getlayout(req, res,err) {
        res.render('notification')
        }

}
module.exports= new NotificationController();