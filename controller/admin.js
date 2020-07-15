const Admins = require('../models/admins');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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