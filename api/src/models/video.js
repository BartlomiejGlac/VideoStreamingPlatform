var mongoose = require('mongoose');
mongoose.connect("mongodb://mongo:27017/videos");

var db = mongoose.connection;


//Video Schema
var VideoSchema = mongoose.Schema({
    user: String,
    title: String,
    description: String,
    file: {
        fileName: {
            type: String,
            index: true
        },
        mimetype: {
            type: String
        },
        path: {
            type: String
        }
    }
});
 module.exports = mongoose.model('Video', VideoSchema);