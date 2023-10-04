const express=require('express');
const router=express.Router();
const loginController=require("../app/controller/LoginController")





router.post('/web',loginController.loginweb);

router.post('/app',loginController.loginapp);
router.use('/', loginController.index);

module.exports = router;