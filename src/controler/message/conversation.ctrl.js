import Conversation from "@/model/conversation.model";
import Notification from "@/model/notification.model";

import {io} from "@/socket/socket";
import User from "@/model/user.model";

class ConversationRoutes {
  async getAllConversation(req, res) {
    try {
      const userId = req.user.id;
      const conversation = await Conversation.find({participants: {$all: [userId]}})
        .populate('participants messages');

      res.status(200).json(conversation);
    } catch (e) {
      console.log("Error in getMessages controller: ", e.message);
      res.status(500).json({error: "Internal server error"});
    }
  }

  async createConversation(req, res) {
    try {
      const {id: receiverId} = req.params;
      const senderId = req.user.id;
      const sender = await User.findById(senderId);
      let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}}).populate('participants messages');

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const notification = new Notification({
        conversation,
        text: `${sender.fullName} muốn nhắn tin cho bạn`,
        receiver: receiverId
      })
      await Promise.all([conversation.save(), notification.save()]);
      io.in(receiverId).emit('notification', {
        text: notification.body,
        conversation
      })

      res.status(201).json(conversation);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({error: "Internal server error"});
    }
  }
}

export default new ConversationRoutes();
