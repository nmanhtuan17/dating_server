import User from "@/model/user.model";
import uploadToCloudinary from "@/utilities/uploadImage";

export class UserCrl {
  static async updateProfile(req, res) {
    try {
      const { likes } = req.body;
      const user = await User.findByIdAndUpdate(req.user.id, {
        ...req.body
      }, {
        new: true
      }).populate('likes')
      if (likes && likes.length > 0) {
        likes.forEach(item => {
          if (!user.likes.some(e => e.equals(item))) {
            user.likes.push(item)
          }
        })
        await user.save();
      }
      return res.status(201).json({ message: "Successfully", data: user });
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  static async uploadAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!req.file) {
        return res.status(400).json({ message: 'upload failed' })
      }
      const result = await uploadToCloudinary(req.file);
      user.avatar = result.url
      await user.save();
      return res.status(201).json({ message: 'Successfully', data: user })
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.find({_id: {$ne: req.user.id}}).populate('likes');
      return res.status(201).json({ message: 'Successfully', data: users })
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }

  }

  static async getUser(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id).populate('likes');
      if (!user) {
        return res.status(404).json({ message: 'User not exist' })
      }
      return res.status(201).json({ message: 'Successfully', data: user })
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }

  }
}
