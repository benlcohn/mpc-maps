// Connect to the database
require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Sound = require('./models/sound');
const Category = require('./models/category');

// Local variables will come in handy for holding retrieved documents
let user, sound, category;
let users, sounds, categories;