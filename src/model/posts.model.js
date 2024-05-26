import mongoose, {Schema} from "mongoose";

const PostSchema = new Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    images: [
      {
        type: String
      }
    ],
    title: String,
    content: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
      }
    ]
  },
  {timestamps: true})
const Post = mongoose.model('Post', PostSchema)
export default Post
