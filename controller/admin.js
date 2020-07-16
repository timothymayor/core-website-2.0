const Admins = require('../models/admins');
const { isEmpty, isEmail } = require('validator');
const bcrypt = require('bcryptjs');

exports.api = {
  row1 : [{ name: 'SMS',
  url:'https://sms.microapi.dev/',
  desc: 'All you need to do is have a senderID or userID. Once supplied, it would be used to identify all transactions done by you.',
  img: 'img/email.png',
},
{
  name: 'Transaction',
  url: 'https://transaction.microapi.dev/ui/',
  desc: 'Transaction Microservice handles transactions',
  img: 'img/Vector (3).png',
},
{
  name: 'Comment',
  url: 'https://comment.microapi.dev',
  desc: 'Access to built-in functionalities for when they want to implement comments and replies within their own application.',
  img: 'img/Vector (2).png',
},
{
  name: 'User Management',
  url: 'https://usermanagement.microapi.dev/',
  desc: 'Actions of the User. Such actions includes :adding a user, deleting a user, updating user info etc. ',
  img: 'img/carbon_user-multiple.png',
},],

row2: [
  {
    name: 'Notification',
    url: 'https://notification.microapi.dev',
    desc: 'This API allows you to send out notifications',
    img: 'img/Vector (1).png',
  },
  {
    name: 'Email',
    url: 'https://email.microapi.dev/',
    desc: 'A simple service for sending emails!',
    img: 'img/email.png',
  },
  {
    name: 'Authentication',
    url: 'https://auth.microapi.dev/api/doc/',
    desc: 'A Dockerized Microservice for Authentication',
    img: 'img/key.png',
  },
  {
    name: 'Compliant',
    url: 'https://complaint.microapi.dev/v1/docs/',
    desc: 'A micro-service for managing complaints.',
    img: 'img/Vector (4).png',
  },
],
row3: [
  {
    name: 'Store Management',
    url: 'https://store.microapi.dev/v1/api-docs/',
    desc: 'A Dockerized Microservice for Store Management',
    img: 'img/settings.png',
  }
]
};

// Admin Login 
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    return res.json({
      message: "All fields are required",
      response: "error"
    });
  }
   if (!isEmail(email)) {
    return res.json({
      message: "Please enter a vailid email",
      response: "error"
    });
  }

  Admins.findOne({ email: email }).then(admin => {
    if (admin) {
      bcrypt.compare(password, admin.password, (err, result) => {
        if(!result) {
          res.json({
            message: "Incorect Password",
            response: "error"
          })
        }else {
          req.session.auth = true;
          req.session.email = admin.email;
          res.json({
            message: "Logged in",
            response: "success"
          })
        }
      });
    }else {
      res.json({
          message: "Incorect Email",
          response: "error"
      });
    }
  }).catch(err => {
    res.json({
      message: "Unable to login",
      response: "error"
    })
  })
}