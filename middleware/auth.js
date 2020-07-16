module.exports = (req, res, next) => {
  try {
    if (!req.session.auth) {
      throw 'Unauthorized request!';
    }else {
      next()
    }
  }catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};