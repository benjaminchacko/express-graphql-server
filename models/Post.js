const { model, Schema } = require("mongoose");
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: ObjectId,
        ref: 'users'
    }
});

module.exports = model("Post", postSchema);
