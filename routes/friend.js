const router = require('express').Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');
const {Friend} = require('../models/friend');
const {Notification} = require('../models/notification');

router.post('/add', async (req, res) => {
    try {
        let {requesterId, recipientId} = req.body;
        let requester = await User.findById(requesterId);
        let recipient = await User.findById(recipientId);

        let expectant = new Friend({
            requester: requesterId, recipient: recipientId, status: 1
        })

        let receiver = new Friend({
            requester: recipientId, recipient: requesterId, status: 2
        })

        let notification = new Notification({
            content: `${requester.name} has sent you a friendship request`,
            requester: recipientId, recipient: requesterId
        })

        requester.friends.push(expectant);
        recipient.friends.push(receiver);
        recipient.notifications.push(notification);

        expectant.save();
        receiver.save();
        notification.save();
        requester.save();
        recipient.save();

        res.status(200).json({message: 'Create relationship'});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/changeStatus', async (req, res) => {
    try {
        let {requesterId, recipientId} = req.body;

        let notification = await Notification.findOneAndDelete(
            {requester: requesterId, recipient: recipientId}
        );

        await User.findByIdAndUpdate(requesterId, {
            $pull: {notifications: notification._id}
        })

        await Friend.findOneAndUpdate(
            {requester: requesterId, recipient: recipientId},
            {$set: {status: 3}}
        )

        await Friend.findOneAndUpdate(
            {requester: recipientId, recipient: requesterId,},
            {$set: {status: 3}}
        )

        res.status(200).json({message: 'Status changed!'});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/delete', async (req, res) => {
    try {
        let {requesterId, recipientId, friendStatus} = req.body;
        const exists = await Notification.exists({requester: requesterId, recipient: recipientId});

        if(!exists) {
            requesterId = [recipientId, recipientId = requesterId][0];
        }

        if(friendStatus !== 3){
            let notification = await Notification.findOneAndDelete(
                {requester: requesterId, recipient: recipientId}
            );

            await User.findByIdAndUpdate(requesterId, {
                $pull: {notifications: notification._id}
            })
        }

        let friendDocRequester = await Friend.findOneAndDelete(
            {requester: requesterId, recipient: recipientId,}
        )

        let friendDocRecipient = await Friend.findOneAndDelete(
            {requester: recipientId, recipient: requesterId,}
        )

        await User.findByIdAndUpdate(requesterId, {
            $pull: {friends: friendDocRequester._id}
        })

        await User.findByIdAndUpdate(recipientId, {
            $pull: {friends: friendDocRecipient._id}
        })

        await Friend.findOneAndDelete(
            {requester: recipientId, recipient: recipientId}
        )

        res.status(200).json({message: 'Friend deleted!'});

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
})

module.exports = router;