import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  hasReplies: Boolean,
  content: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  replies: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String
    }
  ]
})
const Comment = mongoose.model('Comment', CommentSchema)
export default Comment