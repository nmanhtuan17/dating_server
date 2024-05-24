import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {timestamps: true}
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
