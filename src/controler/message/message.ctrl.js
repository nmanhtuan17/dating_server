import {getReceiverSocketId, io} from "@/socket/socket";
import Conversation from "@/model/conversation.model";
import Message from "@/model/message.model";

class MessageCtrl {
  async sendMessage(req, res) {
    try {
      const {message} = req.body;
      const {id: receiverId} = req.params;
      const senderId = req.user.id;

      let conversation = await Conversation.findOne({
        "participants.sender": senderId,
        "participants.receiver": receiverId
      }).populate('participants.sender participants.receiver messages');

      if (!conversation) {
        conversation = await Conversation.create({
          participants: {
            sender: senderId, receiver: receiverId
          },
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

      // SOCKET IO FUNCTIONALITY WILL GO HERE
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({error: "Internal server error"});
    }
  };

  async getMessages(req, res) {
    try {
      const {id: userToChatId} = req.params;
      const senderId = req.user.id;

      const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]},
      }).populate("messages");

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


