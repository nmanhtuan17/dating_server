import Notification from "@/model/notification.model";

class NotificationCtrl {
  async getAll(req, res) {
    try {
      const notis = await Notification.find({
        receiver: req.user.id
      })
      return res.status(200).json(notis)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new NotificationCtrl();
