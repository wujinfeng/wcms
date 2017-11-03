/**
 * Created by wu on 16-8-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

var WebSchema = new Schema({
    _id: ObjectId,
    name: String
});

module.export = WebSchema;