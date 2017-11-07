/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    role: String,
    createAt:{type:Date, default: Date.now },
});

module.export = UserSchema;