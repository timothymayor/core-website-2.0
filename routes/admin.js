const express = require('express');
const router = express.Router()

const adminCrl = require('../controller/admin');

router.post('/login', adminCrl.login);

//Handle incoming GET requests to /admin
// router.get("/admin", adminCrl.admin_get_all);

module.exports= router;