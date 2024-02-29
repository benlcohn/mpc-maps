const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose (for populating category-sound queries)
require('./category');
const soundSchema = require('./soundSchema');

module.exports = mongoose.model('Sound', soundSchema);