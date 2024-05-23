import ConversationModel from "@/model/conversation.model";
import Conversation from "@/model/conversation.model";

class ConversationRoutes {
  async getAllConversation(req, res) {
    try {
      const userId = req.user.id;
      const conversation = await ConversationModel.find({participants: {$all: [userId]}}).populate('participants');
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

      let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]},
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      await conversation.save();

      res.status(201).json(conversation);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({error: "Internal server error"});
    }
  }
}

export default new ConversationRoutes();
