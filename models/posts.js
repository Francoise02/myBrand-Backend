const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const Comment = new mongoose.Schema({
    content: {
        type: String
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    _creator: {
        type: Schema.ObjectId, ref: 'User',
        default: "fefzeeefzefz"
    }
}
)

const PostSchema = new mongoose.Schema({
    // _Postid: String,
    // _id: Number,
    title: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        contentType: String,
        required: true
    },

    hook: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },



    dateTime: {
        type: Date,
        default: Date.now
    },
    downvotes: {
        type: Number,
        default: 0
    },
    upvotes: {
        type: Number,
        default: 0
    },
    category: {
        type: Array
    },

    comments: [Comment]


});


PostSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Post = mongoose.model("Post", PostSchema);
const CommentMod = mongoose.model("Comment", Comment);

module.exports = Post;