const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.DATABASE_CONNECTION_STRING,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buff) => {
                if (err) return err;
                const filename = buff.toString('hex') + path.extname(file.originalname)
                let fileInfo = {filename, bucketName: 'uploads'};
                resolve(fileInfo)
            })
        })
    }
})
const upload = multer({storage})

module.exports = upload;
