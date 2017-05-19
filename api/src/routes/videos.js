var express = require('express');
var router = express.Router();
var multer = require('multer')
var directory = process.env.NODE_ENV == 'test' ? './uploads/tests': './uploads';
console.log(process.env.NODE_ENV);
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
  res.status(200).send();
});

module.exports = router;
