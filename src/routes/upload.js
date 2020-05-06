const express = require('express');
const Route = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    } 
});

Route.post('/', upload.single('avatar'), (req, res) => {

    res.json({
        name: req.body.name,
        path: req.file.path
    });

    console.log(req.file.originalname);
    console.log(req.file.size);
    console.log(req.body.name);

    // console.log(req.file);
});

module.exports = Route;