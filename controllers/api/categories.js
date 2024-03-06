const Category = require('../../models/category');

module.exports = {
    index,
    create
};

async function index(req, res) {
        const categories = await Category.find({}).sort('sortOrder');
        res.json(categories);
    }

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        const category = await Category.create(req.body);
        res.json(category);
    } catch(err) {
        console.log(err);
        res.status(400).json('save category failed');
    }
}