const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    userId: {type: String},
    content: {type: String},
    createdDate: {type: Date, default: new Date()}
})

const Comment = model('comments', CommentSchema);

module.exports = {Comment, CommentSchema};