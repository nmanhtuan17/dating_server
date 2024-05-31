import AuthRoutes from "@/routes/auth.routes";
import UserRoutes from "@/routes/user.routes";
import PostRoutes from "@/routes/post.routes";
import MessageRoutes from "@/routes/message.routes";
import ConversationRoutes from "@/routes/conversation.routes";
import NotificationRoutes from "@/routes/notification.routes";

export const initRoutes = (app) => {
  app.use('/api/auth', AuthRoutes);
  app.use('/api/user', UserRoutes);
  app.use('/api/post', PostRoutes);
  app.use('/api/messages', MessageRoutes);
  app.use('/api/conversation', ConversationRoutes)
  app.use('/api/notification', NotificationRoutes)
}
