import express from "express";
import 'dotenv/config'
import cors from "cors";
import {connect} from "@/config/db/db.conf";
import {initRoutes} from "@/routes";

connect();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

initRoutes(app);


app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening in port ${PORT}`);
})
