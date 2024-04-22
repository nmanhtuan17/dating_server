import User from "../../model/user.model";

export class UserCrl {
  static async updateProfile (req, res) {
    try {
      const {fullName, age, gender, address, email} = req.body;
      const user = await User.findById(req.user.id)
      user.email = email
      user.fullName = fullName
      user.age = age
      user.gender = gender
      user.address = address
      await user.save();
      return res.status(201).json({message: "Successfully", data: user});
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
  static async uploadImage (req, res) {
    try{
      const user = await User.findById(req.user.id);
      if (!req.file) {
        return res.status(400).json({message: 'upload failed'})
      }
      user.avatar = req.file.path
      await user.save();
      return res.status(201).json({message: 'Successfully', data: user})
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
}
