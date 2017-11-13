/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

var PostSchema = new Schema({
    title: {type: String, required: true, unique: true },
    postcategory: [{type: ObjectId, ref:'Postcategory' }],
    state: {type: String},
    author:{type: ObjectId, ref: 'User'},
    content: {brief:String, extended:String},
    image:{type: String},
    publishedAt: {type: Date, default: Date.now},
    createdAt:{type:Date, default: Date.now },
    updatedAt:{type:Date, default: Date.now },
});

module.export = PostSchema;