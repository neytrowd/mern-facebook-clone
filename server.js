const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv/config')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/auth', require('./routes/auth'));
app.use('/post', require('./routes/posts'));
app.use('/user', require('./routes/user'));
app.use('/file', require('./routes/file'));
app.use('/friend', require('./routes/friend'));

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server has been started on port ' + process.env.SERVER_PORT)
})

let db = mongoose.connection;

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database connected');
})

db.on('open', () => {
    let gfs = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads"
    });

    app.locals.gfs = gfs
})





