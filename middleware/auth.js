const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.varify(token, process.env.RANDOM_TOKEN_SECRET);
    const adminId = decodeToken.adminId;
    if (req.body.userId && req.body.userId !== adminId) {
      throw 'Invalid user ID';
    }else {
      next()
    }
  }catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};