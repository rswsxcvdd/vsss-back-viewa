const fs = require("fs");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = 'uploads/tmp'
        fs.access(dest, function (error) {
            if (error) {
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                return cb(null, dest);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers["content-length"])
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            return cb(null, true);
        } else {
            return fileSize > 5242880 ? cb(new Error('File size more than 5 MB')) : cb(new Error('Only .png, .jpg and .jpeg file type allowed!'));
        }
    }
});


module.exports = {
    upload
}