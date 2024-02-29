const express = require('express');
const router = express.Router();
const layoutsCtrl = require('../../controllers/api/layouts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// ALL PATHS START WITH '/api/layouts'

// POST /api/layouts
router.post('/', ensureLoggedIn, layoutsCtrl.create);

// GET /api/layouts
router.get('/', ensureLoggedIn, layoutsCtrl.index);


module.exports = router;