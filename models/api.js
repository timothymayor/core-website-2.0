const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
  owner: {type: String, require: true},
  name: {type: String, require: true},
  url: {type: String, required: true},
  img: {type: String, required: true},
  desc: {type: String, required: true},
  status: {type: String, required: true},
  createdOn: {type: String, default: Date.now()}
});

module.exports = mongoose.model('Apis', apiSchema);
