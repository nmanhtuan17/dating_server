import {getReceiverSocketId, io} from "@/socket/socket";
import Conversation from "@/model/conversation.model";
import Message from "@/model/message.model";

class MessageCtrl {
  async sendMessage(req, res) {
    try {
      const {message} = req.body;
      const {id: receiverId} = req.params;
      const senderId = req.user.id;

      let conversation = await Conversation.findOne(
        {participants: {$all: [senderId, receiverId]}}).populate('participants messages');

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      // this will run in parallel
      await Promise.all([conversation.save(), newMessage.save()]);

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({error: "Internal server error"});
    }
  };

  async getMessages(req, res) {
    try {
      const {id} = req.params;

      const conversation = await Conversation.findById(id).populate('participants messages');

      if (!conversation) return res.status(200).json([]);

      const messages = conversation.messages;

      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({error: "Internal server error"});
    }
  };
}

export default new MessageCtrl();


