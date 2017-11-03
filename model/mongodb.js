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

var config = require('../config/config');
var mongoose = require('mongoose');
var PostSchema = require('./PostSchema');
var PostcategorySchema = require('./PostcategorySchema');
var UserSchema = require('./UserSchema');
var GallerySchema = require('./GallerySchema');


var conn = mongoose.createConnection(config.mongoUrl, {server: {poolSize: 10}}, (err) => {
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
exports.GalleryModel = conn.model('Gallery', GallerySchema);


