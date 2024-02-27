const express = require('express');
const router = express.Router();
const upload = require("multer")();
const soundsCtrl = require('../../controllers/api/sounds');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// ALL PATHS START WITH '/api/sounds'

// GET /api/sounds
router.get('/', ensureLoggedIn, soundsCtrl.index);
// POST /api/sounds/upload
router.post('/upload', ensureLoggedIn, upload.single('sound'), soundsCtrl.upload);



module.exports = router;