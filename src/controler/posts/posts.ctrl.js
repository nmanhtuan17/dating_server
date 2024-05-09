import User from "@/model/user.model";
import Post from "@/model/posts.model";
import uploadToCloudinary from "@/utilities/uploadImage";

class PostCtrl {
  async upload(req, res) {
    const {
      description,
      title
    } = req.body
    try {
      const user = await User.findById(req.user.id);
      if (!req.files) {
        return res.status(400).json({message: 'upload failed'})
      }
      const files = req.files;
      const urls = [];
      for (const file of files) {
        const newPath = await uploadToCloudinary(file);
        urls.push({url: newPath.url});
      }
      const post = new Post({
        onwer: user._id,
        image: urls,
        title: title,
        description: description
      })
      return res.status(201).json({message: 'Successfully', data: post})
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
}

export default new PostCtrl()
