const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/:filename', async (req, res) => {
    try {
        if (req.app.locals.gfs) {
            req.app.locals.gfs.find({filename: req.params.filename}).toArray((err, files) => {
                if (!files[0] || files[0].length === 0) {
                    return res.status(404).json({err: 'No file exists'});
                }

                if (new RegExp(/image\/*/gi).test(files[0].contentType)) {
                    req.app.locals.gfs.openDownloadStreamByName(files[0].filename).pipe(res);

                } else if (new RegExp(/video\/*/gi).test(files[0].contentType)) {

                    if (req.headers['range']) {
                        let parts = req.headers['range'].replace(/bytes=/, "").split("-");
                        let partialstart = parts[0];
                        let partialend = parts[1];
                        let start = parseInt(partialstart, 10);
                        let end = partialend ? parseInt(partialend, 10) : files[0].length - 1;
                        let chunksize = (end - start) + 1;

                        res.writeHead(206, {
                            'Accept-Ranges': 'bytes',
                            'Content-Length': chunksize,
                            'Content-Range': 'bytes ' + start + '-' + end + '/' + files[0].length,
                            'Content-Type': files[0].contentType
                        });

                        req.app.locals.gfs.openDownloadStreamByName(
                            files[0].filename,
                            {
                                start, end
                            }
                        ).pipe(res);

                    } else {
                        res.header('Content-Length', files[0].length);
                        res.header('Content-Type', files[0].contentType);
                        req.app.locals.gfs.openDownloadStreamByName(files[0].filename).pipe(res);
                    }

                } else {
                    res.status(404).json({message: 'Not an media'});
                }
            });
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (req.app.locals.gfs) {
            req.app.locals.gfs.delete(new mongoose.Types.ObjectId(req.params.id));
            res.status(200).json({message: 'Successful'});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

module.exports = router;