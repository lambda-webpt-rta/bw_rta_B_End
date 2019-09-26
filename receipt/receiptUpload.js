const express = require('express');
const upload = require('multer');
const router = express();

// set upload engine

const storage = multer.diskStorage({
    destination:'/bw_rta_backend/data',
    filename:function(req,file,cb){
        cb(null,file.filename + '-'+ Date.now() +
        Path.extname(fine.originalname));
    }
})
// init upload
const upload = multer({
    storage:storage
}).single('receipt_url')

router.post('/upload',(req,res) =>{
    upload(req,res,(err) =>{
        if(err){
            res.render('index',{

            })
        }else{
            console.log(req.file);
            res.send('file uploaded')
        }
    })
})
module.exports = router;