var mongoose = require('mongoose');
var VideoModel = require('../models/video')

module.exports.createVideo = function (title, description, userName, videoMetadata, callback) {
    var video = new VideoModel({
        user: userName,
        title: title,
        description: description,
        file: {
            name: callback.fileName,
            mimetype: videoMetadata.mimetype,
            path: videoMetadata.path
        }
    })
    video.save(callback);
}
module.exports.getListOfVideos = () => {
    return new Promise((resolve, reject) => {
        VideoModel.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

module.exports.getVideoById = (id) => {
    return new Promise((resolve, reject) => {
        VideoModel.findById(id).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}