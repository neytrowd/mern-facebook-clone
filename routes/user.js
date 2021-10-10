const router = require('express').Router();
const {User} = require('../models/user');
const {Friend} = require('../models/friend')
const {Comment} = require('../models/comment')
const {Notification} = require('../models/notification');
const upload = require('../storage');
const bcrypt = require('bcryptjs');

router.post('/getAllUsers', async (req, res) => {
    try {
        let users = await User.find()
            .populate({path: 'posts', populate: {path: 'comments', model: Comment}})
            .populate({path: 'friends', model: Friend})
            .populate({path: 'notifications', model: Notification})
            .exec();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/changePermissions', upload.single('photo'), async (req, res) => {
    try {
        let data = req.body;
        let {id, password} = data;
        delete data.id;

        if (!!password) {
            data.password = await bcrypt.hash(password, 12);
        } else {
            delete data.password;
        }

        if (!!req.file) {
            data.avatar.id = req.file.id;
            data.avatar.name = req.file.filename;
        }

        let user = await User.findOneAndUpdate({_id: id}, {...data}, {
            returnOriginal: false
        })

        await user.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/getUser', async (req, res) => {
    try {
        let {id} = req.body;
        let user = await User.findById(id)
            .populate({path: 'posts', populate: {path: 'comments', model: Comment}})
            .populate({path: 'friends', model: Friend})
            .populate({path: 'notifications', model: Notification})
            .exec();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;