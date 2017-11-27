/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PostcategorySchema = new Schema({
    name: {type: String},
    parentId: {type:String},
    image: {type: String},
    author:{type: ObjectId, ref: 'User'}
});

module.export = PostcategorySchema;