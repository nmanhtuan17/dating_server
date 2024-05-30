import mongoose, {Schema} from "mongoose";

const NotificationSchema = new Schema({
    body: String,
    type: String,
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    }
  },
  {timestamps: true})
const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
