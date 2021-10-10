const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.post('/register', async (req, res) => {
    try {
        let {name, email, password, confirmPassword} = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({message: 'All fields must be filled!'});
        }
        if (password.length < 5) {
            return res.status(400).json({message: 'Password must be at least 5 characters long!'});
        }
        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Passwords must match!'});
        }

        let candidate = await User.findOne({email});
        if (!!candidate) {
            return res.status(400).json({message: 'This user already exists!'});
        }

        let hashedPassword = await bcrypt.hash(password, 12);
        let user = new User({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'User created'});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


router.post('/login', async (req, res) => {
    try {
        let {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'All fields must be filled!'});
        }

        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'This email is not registered!'});
        }

        let passwordMatching = bcrypt.compare(password, user.password)
        if (!passwordMatching) {
            return res.status(400).json('Wrong password');
        }

        let token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.json({token, userId: user._id})

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/google', async (req, res) => {
    try {
        const {token} = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const {name, email} = ticket.getPayload();

        let candidate = await User.findOne({email});
        if (!!candidate) {
            let token = jwt.sign({id: candidate._id}, process.env.JWT_SECRET);
            return res.json({token, userId: candidate._id, name: candidate.name})
        }

        let user = new User({name, email});
        await user.save();
        let tokenValue = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(201).json({token: tokenValue, userId: user._id})

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/tokenIsValid', async (req, res) => {
    try {
        let {token} = req.body;
        if (!token) return res.json(false);
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.json(false);
        return res.json(true);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


router.post('/currentUser', async (req, res) => {
    try {
        let {token} = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.json({
            name: user.name,
            id: user._id
        });

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


module.exports = router;