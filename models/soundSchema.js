const Schema = require('mongoose').Schema;

const soundSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
}, {
  timestamps: true
});

module.exports = soundSchema;
