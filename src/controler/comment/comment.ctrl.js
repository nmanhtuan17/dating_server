import Post from "@/model/posts.model";
import Comment from "@/model/comment.model";

class CommentCtrl {
  async addComment(req, res) {
    const {
      text
    } = req.body
    const {postId} = req.params
    try {
      const post = await Post.findById(postId).populate('owner comments')
      const newComment = new Comment({
        owner: req.user._id,
        text: text,
        hasReply: false
      })
      post.comments.push(newComment._id);
      await Promise.all([post.save(), newComment.save()])
      return res.status(201).json(newComment)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

}

export default new CommentCtrl()
