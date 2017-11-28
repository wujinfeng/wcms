/**
 * 文章
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Mixed = Schema.Types.Mixed;

let PostSchema = new Schema({
    _id: ObjectId,
    title: {type: String, required: true, unique: true},
    postcategory: [{type: ObjectId, ref: 'Postcategory'}],
    state: {type: String},
    author: {type: ObjectId, ref: 'User'},
    content: {brief: String, extended: String},
    image: {type: String},
    publishedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.export = PostSchema;