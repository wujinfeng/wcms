/**
 * 用户
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
    username: ObjectId,       //用户名
    password: String,       //密码
    name: String,           //姓名
    email: String,          //邮件
    role: String           //角色
}, {timestamps: true});

module.exports = UserSchema;