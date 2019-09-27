const express = require('express');
const router = express();
var multer  = require('multer');
var fs  = require('fs');

router.set('view engine', 'ejs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = '/bw_rta_backend/data';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, file.filename + '_' + Date.now() + 
        Path.extname(file.originalname));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('receipt_url', 12);

router.post('/upload',  (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})

module.exports = router;