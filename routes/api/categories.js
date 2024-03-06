const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// ALL PATHS START WITH '/api/categories'
// POST /api/layouts
router.post('/', ensureLoggedIn, categoriesCtrl.create);
// GET /api/categories
router.get('/', ensureLoggedIn, categoriesCtrl.index);


module.exports = router;