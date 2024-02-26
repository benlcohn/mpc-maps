// Connect to the database
require('dotenv').config();
require('./config/database');

const User = require('./models/user');

// Local variables will come in handy for holding retrieved documents
let user;
let users;