/**
 * 分类目录
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let PostcategorySchema = new Schema({
    _id: ObjectId,
    name: {type: String},
    parentId: {type: String},
    brief: {type: String},
    image: {type: String}
});

module.export = PostcategorySchema;