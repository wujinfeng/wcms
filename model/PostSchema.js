/**
 * 文章
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Mixed = Schema.Types.Mixed;

let PostSchema = new Schema({
    title: {type: String, required: true, unique: true},
    postcategory: [{type: ObjectId, ref: 'Postcategory'}],
    state: {type: String},
    author: {type: ObjectId, ref: 'User'},
    content: {brief: String, extended: String},
    image: {type: String},
    publishedAt: {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = PostSchema;