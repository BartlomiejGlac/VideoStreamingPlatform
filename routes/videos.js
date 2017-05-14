var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype != 'video/mp4') {
      cb(new Error("Unsuportet type of file"))
    }
  }
})

router.route('/').post(upload.any(), function (req, res, next) {
  console.log(req.body) // form fields
  console.log(req.files) // form files
  res.status(204).send();
});

module.exports = router;
