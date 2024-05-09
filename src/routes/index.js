import AuthRoutes from "@/routes/auth.routes";
import UserRoutes from "@/routes/user.routes";
import PostRoutes from "@/routes/post.routes";

export const initRoutes = (app) => {
  app.use('/api/auth', AuthRoutes);
  app.use('/api/user', UserRoutes);
  app.use('/api/post', PostRoutes);
}
