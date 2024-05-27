import User from "@/model/user.model";
import Post from "@/model/posts.model";
import uploadToCloudinary from "@/utilities/uploadImage";

class PostCtrl {
  async upload(req, res) {
    const {
      content,
      images
    } = req.body
    try {
      const post = new Post({
        owner: req.user.id,
        images: images,
        content: content
      })
      await post.save();
      return res.status(201).json(post)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.find({}).populate(
        'owner likes'
      );
      return res.status(200).json(posts)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  async uploadImage(req, res) {
    try {
      if (!req.files) {
        return res.status(400).json({message: 'upload failed'})
      }
      const files = req.files;
      const urls = [];
      for (const file of files) {
        const newPath = await uploadToCloudinary(file);
        urls.push(newPath.url);
      }
      return res.status(201).json(urls)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  async likePost(req, res) {
    try {
      const {
        postId
      } = req.params
      const post = await Post.findById(postId).populate('owner')

      if (!post.likes.some(e => e.equals(req.user.id))) {
        post.likes.push(req.user.id)
      } else {
        post.likes.pull(req.user.id);
      }
      await post.save();
      return res.status(201).json(post);
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  async getPost (req, res) {
    try {
      const {
        postId
      } = req.params
      const post = await Post.findById(postId).populate('owner')
      return res.status(200).json(post);
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
}

export default new PostCtrl()
