import mongoose, {Schema} from "mongoose";

const PostSchema = new Schema({
  onwer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: [
    {
      url: String
    }
  ],
  title: String,
  description: String
})
const Post = mongoose.model('Post', PostSchema)
export default Post