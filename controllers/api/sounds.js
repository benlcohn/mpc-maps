const uploadFile = require('../../config/uploadFile');
const Sound = require('../../models/sound');

module.exports = {
    upload
};

async function upload(req, res) {
    try {
        if (req.file) {
            // The uploadFile fuction will return the uploaded file's S3 endpoint
            const soundURL = await uploadFile(req.file);
            const soundDoc = await Sound.create({
                url: soundURL,
                // Inputs sent with the file are avail on req.body
                title: req.body.title
            });
            res.json(soundDoc);
        } else {
            throw new Error('Must select a file');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}