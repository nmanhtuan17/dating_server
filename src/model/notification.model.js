import mongoose, {Schema} from "mongoose";

const NotificationSchema = new Schema({
    text: String,
    type: String,
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {timestamps: true})
const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
