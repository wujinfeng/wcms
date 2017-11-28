/**
 * 用户
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    name: String,
    email: String,
    role: String,
    createdAt: {type: Date, default: Date.now},
});

module.export = UserSchema;