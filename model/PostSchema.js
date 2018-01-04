/**
 * 文章
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Mixed = Schema.Types.Mixed;

let PostSchema = new Schema({
    title: {type: String, required: true, unique: true},
    brief: {type: String},
    content: {type: String},
    html: {type: String},
    top: {type: Boolean},
    postcategoryId: [{type: [ObjectId], ref: 'Postcategory'}],
    image: {type: String},
    author: {type: ObjectId, ref: 'User'},
    state: {type: String},
    publishedAt: {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = PostSchema;