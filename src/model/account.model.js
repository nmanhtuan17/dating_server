import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
  email: String,
  password: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Account = mongoose.model('Account', AccountSchema)
export default Account