const uploadFile = require('../../config/uploadFile');
const Sound = require('../../models/sound');
const Category = require('../../models/category')

module.exports = {
    upload,
    index,
    show
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
    try {
      const category = await Category.findOne({ name: req.body.category });
  
      if (!req.files || req.files.length === 0) {
        throw new Error('No files uploaded');
      }
  
      const soundDocs = [];
  
      // Loop through each uploaded file
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
  
        // The uploadFile function will return the uploaded file's S3 endpoint
        const soundURL = await uploadFile(file);
        
        // Create a new Sound document for each file
        const soundDoc = await Sound.create({
          url: soundURL,
          title: req.body.title, // Use the same title for all files, modify if needed
          category: category,
          user: req.user._id
        });
  
        soundDocs.push(soundDoc);
      }
  
      res.json(soundDocs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }