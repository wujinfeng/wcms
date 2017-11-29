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
var mongoose = require('mongoose');
let PostSchema = require('./PostSchema');
let PostcategorySchema = require('./PostcategorySchema');
let UserSchema = require('./UserSchema');
let MediaSchema = require('./MediaSchema');

mongoose.Promise = global.Promise;

var mongoose = mongoose.createConnection(config.mongoUrl, {server: {poolSize: 10}}, (err) => {
    if (err) {
        console.log('connect to mongodb error:');
        console.log(err);
        return process.exit(1);
    }
});

mongoose.on('connected', () => {
    console.log('Mongoose connected ok.');
});

exports.PostModel = mongoose.model('Post', PostSchema);
exports.PostcategoryModel = mongoose.model('Postcategory', PostcategorySchema);
exports.UserModel = mongoose.model('User', UserSchema);
exports.MediaModel = mongoose.model('Gallery', MediaSchema);
