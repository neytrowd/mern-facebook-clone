const {Schema, model} = require('mongoose');

const FriendSchema = new Schema({
    requester: {type: String},
    recipient: {type: String},
    status: {
        type: Number,
        enums: [
            1,    //'requested',
            2,    //'pending',
            3,    //'friends'
        ]
    }
});

const Friend = model('friends', FriendSchema);

module.exports = {Friend, FriendSchema};