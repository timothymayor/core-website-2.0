const express = require('express');
const router = express.Router()

const adminCrl = require('../controller/admin');

router.post('/login', adminCrl.login);

module.exports= router;