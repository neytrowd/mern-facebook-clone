const {Schema, model} = require('mongoose');

const NotificationSchema = new Schema({
    content: {type: String},
    requester: {type: String},
    recipient: {type: String},
    createdDate: {type: Date, default: new Date()}
})

const Notification = model('notifications', NotificationSchema);

module.exports = {Notification, NotificationSchema}