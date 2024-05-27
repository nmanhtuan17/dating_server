import mongoose, {Schema} from "mongoose";

const CommentSchema = new Schema({
    text: String,
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    hasReply: Boolean
  },
  {timestamps: true})
const Comment = mongoose.model('Comment', CommentSchema)
export default Comment
