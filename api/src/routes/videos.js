var express = require('express');
var router = express.Router();
var multer = require('multer');
var videoDAL = require('../dal/videos');
var directory = process.env.NODE_ENV == 'test' ? './uploads/tests' : './uploads';

var upload = multer({
  dest: directory,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'video/mp4') {
      cb(null, true)
    }
    else {
      cb(new Error("Unsuportet type of file"))
    }
  }
})

router.route('/').post(upload.any(), function (req, res, next) {
  console.log(req.body) // form fields
  console.log(req.files) // form files

  videoDAL.createVideo(req.body.title, req.body.description, "default", req.files[0], (err, video) => {
    if (err) throw err;
  })
  res.status(200).send();
});

router.route('/').get((req, res, next) => {
  videoDAL.getListOfVideos().then((videos) => {
    res.status(200).json(videos);
  }).catch((err) => {
    res.status(200).json(err);
  });
});

router.route('/:id').get((req, res, next) => {
  videoDAL.getVideoById(req.params.id).then((video) => {
    res.status(200).json(video);
  }).catch((err) => {
    res.status(200).json(err);
  });
});

router.route('/:id/stream').get((req, res, next) => {
  videoDAL.getVideoById(req.params.id).then((video) => {
    const movieFile = video.file.path;
    console.log(movieFile);
    fs.stat(movieFile, (err, stats) => {
      if (err) {
        console.log(err);
        return res.status(404).end('<h1>Movie Not found</h1>');
      }
      console.log(movieFile);
      // Variáveis necessárias para montar o chunk header corretamente
      const { range } = req.headers;
      const { size } = stats;
      const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
      const end = size - 1;
      const chunkSize = (end - start) + 1;
      console.log(range, size, start, end, chunkSize)
      // Definindo headers de chunk
      res.set({
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });
      console.log(res)
      // É importante usar status 206 - Partial Content para o streaming funcionar
      res.status(206);
      // Utilizando ReadStream do Node.js
      // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
      const stream = fs.createReadStream(movieFile, { start, end });
      console.log("stream is opening")
      stream.on('open', () => stream.pipe(res));
      stream.on('error', (streamErr) => res.end(streamErr));
    });
  }).catch((err) => {
    res.status(200).json(err);
  });
});

module.exports = router;
