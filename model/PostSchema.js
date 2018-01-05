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
    sort: {type: Number},
    postcategoryId: [{type: [ObjectId], ref: 'Postcategory'}],
    image: {type: String},
    author: {type: ObjectId, ref: 'User'},
    status: {type: Number, default: 1},
    publishedAt: {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = PostSchema;