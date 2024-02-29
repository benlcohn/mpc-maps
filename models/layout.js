const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    pad1: { type: Schema.Types.ObjectId, ref: 'Sound' },
    pad2: { type: Schema.Types.ObjectId, ref: 'Sound' },
    pad3: { type: Schema.Types.ObjectId, ref: 'Sound' },
    pad4: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padQ: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padW: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padE: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padR: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padA: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padS: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padD: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padF: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padZ: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padX: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padC: { type: Schema.Types.ObjectId, ref: 'Sound' },
    padV: { type: Schema.Types.ObjectId, ref: 'Sound' },
}, {
    timestamps: true
})


module.exports = mongoose.model('Layout', layoutSchema);