import express from "express";
import dotenv from 'dotenv';

import  Opportunity from './routes/opp.js';
import auth from "./routes/auth.js"
import sub from "./routes/sub.js"
import connectDB from "./routes/database.js";
import logger from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import report from "./routes/report.js";
import notification from "./routes/notification.js"

const app = express();
app.use(logger);
//parser application
app.use(express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
dotenv.config();
connectDB();
app.use(cookieParser());
// app.use(cors({
//  origin:process.env.APP_URL,
// }))
const PORT=process.env.PORT;

app.get("/", (req, res) => {
  
  res.status(500).json({
    appName: "Training Center",
    version:"2.0.0",
    port:PORT,
  });
});

//for get user auth login and register
app.use("/api/auth",auth)

//get /api/users/ details
app.use("/api/users",auth)

//opportunities
app.use("/api/opportunities",Opportunity);

//get /api/submissions
app.use("/api/submissions",sub)

//GET – /api/notifications Fetch notifications for a user.
//Reports
app.use("/api/notifications",notification)

//GET /api/reports/opportunity-stats – Generate reports on participation.
app.use("/api/reports/opportunity-stats",report)


app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

