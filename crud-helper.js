// Connect to the database
require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Sound = require('./models/sound');
const Category = require('./models/category');
const Layout = require('./models/layout');

// Local variables will come in handy for holding retrieved documents
let user, sound, category, layout;
let users, sounds, categories, layouts;