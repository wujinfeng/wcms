/**
 * Created by wu on 16-8-22.
 *
 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 ObjectId
 Array
 */

let config = require('../config/config');
let mongoose = require('mongoose');
let PostSchema = require('./PostSchema');
let PostcategorySchema = require('./PostcategorySchema');
let UserSchema = require('./UserSchema');
let MediaSchema = require('./MediaSchema');

mongoose.Promise = global.Promise;

let conn = mongoose.createConnection(config.mongoUrl, {server: {poolSize: 10}}, (err) => {
    if (err) {
        console.log('connect to mongodb error:');
        console.log(err);
        return process.exit(1);
    }
});

conn.on('connected', () => {
    console.log('Mongoose connected ok.');
});

exports.PostModel = conn.model('Post', PostSchema);
exports.PostcategoryModel = conn.model('Postcategory', PostcategorySchema);
exports.UserModel = conn.model('User', UserSchema);
exports.MediaSchema = conn.model('Gallery', MediaSchema);
