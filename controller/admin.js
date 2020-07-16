const Admins = require('../models/admins');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.api = {
  row1 : [{ name: 'SMS',
  url:'https://sms.microapi.dev/',
  desc: 'All you need to do is have a senderID or userID. Once supplied, it would be used to identify all transactions done by you.',
  img: 'img/sms.png',
  status: "verified"
},
{
  name: 'Transaction',
  url: 'https://transaction.microapi.dev/ui/',
  desc: 'Transaction Microservice handles transactions',
  img: 'img/buy.png',
  status: "verified"
},
{
  name: 'Comment',
  url: 'https://comment.microapi.dev',
  desc: 'Access to built-in functionalities for when they want to implement comments and replies within their own application.',
  img: 'img/comment.png',
  status: "unverified"
},
{
  name: 'User Management',
  url: 'https://usermanagement.microapi.dev/',
  desc: 'Actions of the User. Such actions includes :adding a user, deleting a user, updating user info etc. ',
  img: 'img/think.png',
  status: "verified"
},],

row2: [
  {
    name: 'Notification',
    url: 'https://notification.microapi.dev',
    desc: 'This API allows you to send out notifications',
    img: 'img/bell.png',
    status: "unverified"
  },
  {
    name: 'Email',
    url: 'https://email.microapi.dev/',
    desc: 'A simple service for sending emails!',
    img: 'img/mail.png',
    status: "verified"
  },
  {
    name: 'Authentication',
    url: 'https://auth.microapi.dev/api/doc/',
    desc: 'A Dockerized Microservice for Authentication',
    img: 'img/biometric.png',
    status: "verified"
  },
  {
    name: 'Compliant',
    url: 'https://complaint.microapi.dev/v1/docs/',
    desc: 'A micro-service for managing complaints.',
    img: 'img/complain.png',
    status: "unverified"
  },
],
row3: [
  {
    name: 'Store Management',
    url: 'https://store.microapi.dev/v1/api-docs/',
    desc: 'A Dockerized Microservice for Store Management',
    img: 'img/gear.png',
    status: "verified"
  }
]
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