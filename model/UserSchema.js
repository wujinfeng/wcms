/**
 * 用户
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
    _id: ObjectId,
    username: String,       //用户名
    password: String,       //密码
    name: String,           //姓名
    email: String,          //邮件
    role: String,           //角色
    createdAt: {type: Date, default: Date.now},
});

module.export = UserSchema;