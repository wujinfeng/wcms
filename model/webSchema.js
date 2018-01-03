/**
 * 系统配置
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Mixed = Schema.Types.Mixed;

let WebSchema = new Schema({
    name: String
}, {timestamps: true});

module.exports = WebSchema;