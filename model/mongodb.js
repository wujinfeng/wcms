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
mongoose.set('debug', true);

let conn = mongoose.createConnection(config.mongoUrl, {useMongoClient:true, poolSize: 10});

conn.on('connected', () => {
    console.log('Mongoose connected ok.');
});

exports.PostModel = conn.model('Post', PostSchema);
exports.PostcategoryModel = conn.model('Postcategory', PostcategorySchema);
exports.UserModel = conn.model('User', UserSchema);
exports.MediaModel = conn.model('Media', MediaSchema);
