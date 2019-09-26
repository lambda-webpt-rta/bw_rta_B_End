const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

router.post('/upload', function(req, res) {
        let sampleFile;
        let uploadPath;
    
        if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
        }
    
        console.log('req.files >>>', req.files); // eslint-disable-line
    
        sampleFile = req.files.sampleFile;
    
        uploadPath = __dirname + '/uploads/' + sampleFile.name;
    
        sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        
        res.send('File uploaded to ' + uploadPath);
        });
    });
  