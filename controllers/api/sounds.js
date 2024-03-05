const uploadFile = require('../../config/uploadFile');
const Sound = require('../../models/sound');
const Category = require('../../models/category')

module.exports = {
    upload,
    index,
    show,
    remove
};

async function index(req, res) {
    const sounds = await Sound.find({}).sort('title').populate('category');
    console.log(sounds)
    // re-sort based upon the sortOrder of the populated categories
    const sortedSounds = sounds.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    console.log(sortedSounds);
    res.json(sounds);
  }

async function show(req, res) {
    const sound = await Sound.findById(req.params.id);
    res.json(sound);
}

async function upload(req, res) {
    const category = await Category.findOne({ name: req.body.category });
    console.log(category)
    try {
        if (req.file) {
            // The uploadFile fuction will return the uploaded file's S3 endpoint
            const soundURL = await uploadFile(req.file);
            const soundDoc = await Sound.create({
                url: soundURL,
                // Inputs sent with the file are avail on req.body
                title: req.body.title,
                category: category,
                user: req.user._id
            });
            res.json(soundDoc);
        } else {
            throw new Error('Must select a file');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function remove(req, res) {
    try {
        const sound = await Sound.findByIdAndDelete(req.params.id);

        if (!sound) {
            return res.status(404).json({ error: 'Sound not found' });
        }

        res.json({ message: 'Sound successfully deleted', sound: sound });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
