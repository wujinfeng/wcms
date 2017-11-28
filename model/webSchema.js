/**
 * 系统配置
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Mixed = Schema.Types.Mixed;

let WebSchema = new Schema({
    _id: ObjectId,
    name: String,
    createdAt: {type: Date, default: Date.now},
});

module.export = WebSchema;