/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    email: String,
    isAdmin: String
});

module.export = UserSchema;