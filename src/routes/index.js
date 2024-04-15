import AuthRoutes from "@/routes/auth.routes";


export const initRoutes = (app) => {
  app.use('/api/auth', AuthRoutes);
}
