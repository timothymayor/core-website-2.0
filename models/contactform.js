const mongoose = require('mongoose');

const contactForm = mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, required: true},
  comments: {type: String, required: true},
});

module.exports = mongoose.model('ContactForm', contactForm);
