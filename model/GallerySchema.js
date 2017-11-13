/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var GallerySchema = new Schema({
    name: {type: String},
    detail: {type: String},
    image: {type: String},
    createdAt:{type:Date, default: Date.now },
    updatedAt:{type:Date, default: Date.now },
});

module.export = GallerySchema;