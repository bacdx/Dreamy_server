const express = require('express');
const router=express.Router();
const customer = require("../app/controller/Customer.controller")

router.get("/",customer.view)
router.get("/:id",customer.viewDeltail)

module.exports=router ;