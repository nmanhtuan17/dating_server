import AuthRoutes from "@/routes/auth.routes";
import UserRoutes from "./user.routes";


export const initRoutes = (app) => {
  app.use('/api/auth', AuthRoutes);
  app.use('/api/user', UserRoutes);
}
