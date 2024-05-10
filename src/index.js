import express from "express";
import 'dotenv/config'
import cors from "cors";
import {connect} from "@/config/db/db.conf";
import {initRoutes} from "@/routes";
import {app, server} from '@/socket/socket'
connect();
const PORT = process.env.PORT;
app.use(cors({
  origin: "*"
}));
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

initRoutes(app);


server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening in port ${PORT}`);
})
