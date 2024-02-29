const Layout = require('../../models/layout');

module.exports = {
    index,
    create
};

async function index(req, res) {
    const layouts = await Layout.find({user: req.user._id}).sort('-updatedAt')
        .populate('pad1')
        .populate('pad2')
        .populate('pad3')
        .populate('pad4')
        .populate('padQ')
        .populate('padW')
        .populate('padE')
        .populate('padR')
        .populate('padA')
        .populate('padS')
        .populate('padD')
        .populate('padF')
        .populate('padZ')
        .populate('padX')
        .populate('padC')
        .populate('padV');
    res.json(layouts);
}

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        const layout = await Layout.create(req.body);
        res.json(layout);
    } catch(err) {
        console.log(err);
        res.status(400).json('save layout failed');
    }
}