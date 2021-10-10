const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    media: {
        id: {type: String},
        contentType: {type: String},
        name: {type: String}
    },
    like: {type: Array, default: []},
    dislike: {type: Array, default: []},
    createdDate: {type: Date, default: new Date()},
    comments: [{type: Schema.Types.ObjectId,  ref: 'comments'}]
})

const Post = model('posts', PostSchema);

module.exports = {Post, PostSchema}