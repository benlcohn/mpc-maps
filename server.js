const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();

// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// // Configure both serve-favicon & static middleware
// // to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;


// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/sounds', require('./routes/api/sounds'));
app.use('/api/layouts', require('./routes/api/layouts'));
app.use('/api/categories', require('./routes/api/categories'));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/categories', async (req, res) => {
  try {
      const categories = await Category.find({}).sort('sortOrder');
      console.log(categories); // Log to see the actual data being sent
      res.json(categories);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
