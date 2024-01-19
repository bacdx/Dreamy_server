const express = require('express');
const router=express.Router();
const customer = require("../app/controller/Customer.controller")
const checklogin = require("../app/controller/Middleware.controller");
router.get("/",checklogin,customer.view)
router.get("/:id",checklogin,customer.viewDeltail)

module.exports=router ;