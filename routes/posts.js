const upload = require('../storage');
const router = require('express').Router();
const {User} = require('../models/user');
const {Post} = require('../models/post');
const {Comment} = require('../models/comment');

router.post('/addPost', upload.single('media'), async (req, res) => {
    try {
        let contentType;
        let data = req.body;
        let user = await User.findById(data.id);
        let isVideo = new RegExp(/video\/*/gi).test(req.file.contentType);

        if (isVideo) {
            contentType = 'video';
        } else {
            contentType = 'photo';
        }

        let post = new Post({
            title: data.title,
            description: data.description,
            media: {
                id: req.file.id,
                contentType,
                name: req.file.filename
            }
        })

        post.save(() => {
            user.posts.push(post)
            user.save();
        })

        res.status(200).json('Added');

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/changePost', upload.single('newMedia'), async (req, res) => {
    try {
        let data = req.body;
        let post = await Post.findById(data.postId);
        post.title = data.title;
        post.description = data.description;

        if (req.file) {
            let contentType;
            let isVideo = new RegExp(/video\/*/gi).test(req.file.contentType);

            if (isVideo) contentType = 'video';
            else contentType = 'photo';

            post.media = {
                id: req.file.id,
                contentType,
                name: req.file.filename
            }
        }

        await post.save();
        res.status(200).json('Changed');

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/deletePost', async (req, res) => {
    try {
        let {userId, postId} = req.body;
        let user = await User.findById(userId);
        user.posts = user.posts.filter(post => String(post) !== String(postId))
        await user.save();
        await Post.findByIdAndDelete(postId);
        res.status(200).json('Deleted');

    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/addComment', async (req, res) => {
    try {
        let {userId, postId, content} = req.body;
        let post = await Post.findById(postId);
        let comment = new Comment({
            content, userId
        })

        comment.save(() => {
            post.comments.push(comment)
            post.save();
        })

        res.status(200).json('Added');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/changeLikes', async (req, res) => {
    try {
        let {like, dislike, postId} = req.body;
        let post = await Post.findById(postId);
        post.like = like;
        post.dislike = dislike;
        post.save();
        res.status(200).json('Added');

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router;