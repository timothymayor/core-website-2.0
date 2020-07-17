const Admins = require('../models/admins');
const { isEmpty, isEmail } = require('validator');
const bcrypt = require('bcryptjs');

exports.api = {
  row1 : [{ name: 'SMS',
  url:'https://sms.microapi.dev/',
  desc: 'All you need to do is have a senderID or userID. Once supplied, it would be used to identify all transactions done by you.',
  img: 'img/sms.png',
  status: "pending",
  id: "API234"
},
{
  name: 'Transaction',
  url: 'https://transaction.microapi.dev/ui/',
  desc: 'Transaction Microservice handles transactions',
  img: 'img/buy.png',
  status: "verified",
  id: "API2244"
},
{
  name: 'Comment',
  url: 'https://comment.microapi.dev',
  desc: 'Access to built-in functionalities for when they want to implement comments and replies within their own application.',
  img: 'img/comment.png',
  status: "pending",
  id: "API224"
},
{
  name: 'User Management',
  url: 'https://usermanagement.microapi.dev/',
  desc: 'Actions of the User. Such actions includes :adding a user, deleting a user, updating user info etc. ',
  img: 'img/think.png',
  status: "verified",
  id: "API214"
},],

row2: [
  {
    name: 'Notification',
    url: 'https://notification.microapi.dev',
    desc: 'This API allows you to send out notifications',
    img: 'img/bell.png',
    status: "failed",
    id: "API204"
  },
  {
    name: 'Email',
    url: 'https://email.microapi.dev/',
    desc: 'A simple service for sending emails!',
    img: 'img/mail.png',
    status: "verified",
    id: "API104"
  },
  {
    name: 'Authentication',
    url: 'https://auth.microapi.dev/api/doc/',
    desc: 'A Dockerized Microservice for Authentication',
    img: 'img/biometric.png',
    status: "verified",
    id: "API2114"
  },
  {
    name: 'Compliant',
    url: 'https://complaint.microapi.dev/v1/docs/',
    desc: 'A micro-service for managing complaints.',
    img: 'img/complain.png',
    status: "pending",
    id: "API2340"
  },
],
row3: [
  {
    name: 'Store Management',
    url: 'https://store.microapi.dev/v1/api-docs/',
    desc: 'A Dockerized Microservice for Store Management',
    img: 'img/gear.png',
    status: "verified",
    id: "API2343"
  }
]
};

// Admin Login 
exports.login = (req, res) => {

    const { email, password } = req.body;
    if(isEmpty(email) || isEmpty(password)) {
        req.flash('error', 'All fields are required');
        res.redirect('/login');
    }
    if(!isEmail(email)) {
        req.flash('error', 'Please enter a valid email');
        res.redirect('/login');
    }
    
    Admins.findOne({ email }).then(admin => {
        if(!admin) {
            req.flash('error', 'Email does not exist in our record');
            res.redirect('/login');
        }else{
            bcrypt.compare(password, admin.password, (err, result) => {
                if(result) {
                    req.session.auth = true;
                    req.session.email = admin.email;
                    req.flash('success', 'Welcome back, You\'re logged in');
                    res.redirect('/dashboard');
                }else {
                    req.flash('error', 'Invalid Password');
                    res.redirect('/login');
                }
            })
        }
    }).catch(err => {
        res.json("Errr")
    })
}

exports.logout = (req, res) => {
    req.session.auth = false;
    req.session.email = null;
    res.redirect('/');
}
