const Admins = require('../models/admins');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const fetch = require('node-fetch');

const API = [
    { name: 'SMS',
      url:'https://sms.microapi.dev/',
      desc: 'To start, all you need to do is have a senderID or userID. Once supplied, it would be used to identify all transactions done by you. To send a single sms using an service,visit the respective endpoint and follow the instructions based on format and request to be sent. Remember senderID == userID, and this is personally generated.' 
    },
    {
      name: 'Transaction',
      url: 'https://transaction.microapi.dev/ui/',
      desc: 'Transaction Microservice handles transactions'
    },
    {
      name: 'Comment',
      url: 'https://comment.microapi.dev',
      desc: 'The Comment API gives the developer access to built-in functionalities for when they want to implement comments and replies within their own application.'
    },
    {
      name: 'User Management',
      url: 'https://usermanagement.microapi.dev/',
      desc: 'This API is responsible for various actions of the User. Such actions includes :adding a user, deleting a user, updating user info etc. '
    },
    {
      name: 'Notification',
      url: 'https://notification.microapi.dev',
      desc: 'This API allows you to send out notifications'
    },
    {
      name: 'Email',
      url: 'https://email.microapi.dev/',
      desc: 'A simple service for sending emails!',
    },
    {
      name: 'Authentication',
      url: 'https://auth.microapi.dev/api/doc/',
      desc: 'A Dockerized Microservice for Authentication',
    },
    {
      name: 'Compliant',
      url: 'https://complaint.microapi.dev/v1/docs/',
      desc: 'A micro-service for managing complaints.',
    },
    {
      name: 'Store Management',
      url: 'https://store.microapi.dev/v1/api-docs/',
      desc: 'A Dockerized Microservice for Store Management',
    }
];


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