import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: String,
  age: Number,
  email: String,
  address: String,
  gender: String,
  avatar: String
})

const User = mongoose.model('User', UserSchema)
export default User
