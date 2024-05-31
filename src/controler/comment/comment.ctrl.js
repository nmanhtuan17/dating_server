import Post from "@/model/posts.model";
import Comment from "@/model/comment.model";
import Notification from "@/model/notification.model";
import {io} from "@/socket/socket";
import User from "@/model/user.model";

class CommentCtrl {
  async addComment(req, res) {
    const {
      text,
      replyTo
    } = req.body
    const {postId} = req.params
    try {
      const post = await Post.findById(postId).populate('owner comments')
      const user = await User.findById(req.user.id);
      const newComment = new Comment({
        owner: req.user.id,
        text: text,
        hasReply: true,
        replyTo: replyTo
      })
      post.comments.push(newComment._id);

      const notification = new Notification({
        text: `${user.fullName} đã bình luận bài viết của bạn`,
        receiver: post.owner._id,
        type: 'other'
      })

      await Promise.all([post.save(), notification.save(), newComment.save()]);

      io.emit('getNotification', {
        text: notification.text
      })

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
