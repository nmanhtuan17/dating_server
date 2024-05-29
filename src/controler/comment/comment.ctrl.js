import Post from "@/model/posts.model";
import Comment from "@/model/comment.model";

class CommentCtrl {
  async addComment(req, res) {
    const {
      text,
      replyTo
    } = req.body
    const {postId} = req.params
    try {
      const post = await Post.findById(postId).populate('owner comments')
      const newComment = new Comment({
        owner: req.user.id,
        text: text,
        hasReply: true,
        replyTo: replyTo
      })
      post.comments.push(newComment._id);
      await Promise.all([post.save(), newComment.save()])
      return res.status(201).json(newComment)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

  async getComment(req, res) {
    try {
      const {postId} = req.params;
      const post = await Post.findById(postId)
        .populate('owner')
        .populate({
          path: 'comments',
          populate: {path: 'owner'}
        });
      return res.status(201).json(post.comments)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }

}

export default new CommentCtrl()
