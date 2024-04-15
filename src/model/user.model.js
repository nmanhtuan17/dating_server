import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullname: String,
  age: Number,
  email: String,
  address: String 
})

const User = mongoose.model('User', UserSchema)
export default User