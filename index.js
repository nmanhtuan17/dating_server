import express from "express";
import 'dotenv/config'
import cors from "cors";
import { initRoutes } from "@/routes";
import { connect } from "@/config/db/db.conf";
connect();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
initRoutes(app);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening in port ${PORT}`);
})
