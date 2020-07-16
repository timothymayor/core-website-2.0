const Admins = require('../models/admins');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// List of APIs
const smsAPI = 'https://sms.microapi.dev/';
const transAPI = 'https://transaction.microapi.dev/ui/';
const commentAPI = 'https://comment.microapi.dev';
const userAPI = 'https://usermanagement.microapi.dev/';
const notifyAPI = 'https://notification.microapi.dev';
const emailAPI = 'https://email.microapi.dev/';
const authAPI = 'https://auth.microapi.dev/api/doc/';
const compAPI = 'https://complaint.microapi.dev/v1/docs/';
const storeAPI = 'https://store.microapi.dev/v1/api-docs/';


// Admin Dashboard
exports.admin_get_all = function(req, res, next) {
    res.render('/index'); //,{ title: '',  layout: 'layouts/detail'});
       
    // Admin.find()

};


// Admin Login 
exports.login = (req, res, next) => {
  Admins.findOne({email: req.body.email}).then(
    (admin) => {
      if (!admin) {
        return res.status(401).json({
          error: new Error("Admin not found!")
        });
      }
      bcrypt.compare(req.body.password, admin.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            {adminId: admin._id},
            process.env.RANDOM_TOKEN_SECRET,
            {expiresIn: '24h'},
          );
          res.status(201).json({
            adminId: admin._id,
            token: token
          });
        }
      ). catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: eror
      });
    }
  );
}