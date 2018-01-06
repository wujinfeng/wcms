/**
 * 用户
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
    username: {type: String, required: true, unique: true},       //用户名
    password: String,       //密码
    name: String,           //姓名
    mobile: String,         //手机
    email: String,          //邮件
    role: String,           //角色
    image: String           //头像
}, {timestamps: true});

module.exports = UserSchema;