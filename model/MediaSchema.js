/**
 * 媒体数据
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let MediaSchema = new Schema({
    _id: ObjectId,
    name: {type: String},
    info: {address: String, type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.export = MediaSchema;