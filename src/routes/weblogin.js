const express=require('express');
const router=express.Router();
const loginController=require("../app/controller/LoginController")




router.get('/web', loginController.index);
router.post('/web',loginController.loginweb);
router.get("/logout",loginController.logout);
router.post('/app',loginController.loginapp);
router.use('/', loginController.index);

module.exports = router;