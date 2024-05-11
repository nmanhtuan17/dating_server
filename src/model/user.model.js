import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: String,
  age: Number,
  email: String,
  address: String,
  gender: String,
  avatar: String,
  marital: String,
  target: String,
  career: String,
  zodiac: String,
  personality: String,
  seeking: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const User = mongoose.model('User', UserSchema)
export default User
