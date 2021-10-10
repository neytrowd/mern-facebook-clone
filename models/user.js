const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, default: ''},
    gender: {type: String, default: ''},
    aboutMe: {type: String, default: ''},
    birthday: {type: Date, default: new Date()},
    language: {type: String, default: ''},
    university: {type: String, default: ''},
    concentration: {type: String, default: ''},
    avatar: {
        id: {type: String, default: ''},
        name: {type: String, default: ''}
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    address: {type: String, default: ''},
    country: {type: String, default: ''},
    city: {type: String, default: ''},
    posts: [{type: Schema.Types.ObjectId, ref: 'posts'}],

    friends: [{type: Schema.Types.ObjectId, ref: 'friends' }],
    notifications: [{type: Schema.Types.ObjectId, ref: 'notifications'}],
})

const User = model('users', UserSchema);

module.exports = {User, UserSchema}