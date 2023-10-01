import  express, { query }  from "express";
import useRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"; 
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";





export const app= express();

config({
  path:"./data/config.env"
})



//middleware
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
  origin:[process.env.FRONTEND_URL],
  methods: ["GET","POST","DELETE","PUT"],
  credentials:true,
}))



app.use("/api/v1/users",useRouter);
app.use("/api/v1/task",taskRouter);





app.get('/',(req,res)=>{
    res.send("hello");
})

// app.get("/users/all", getAllUsers );
// middleware of error handling. ie an error handler..

// error handler.. or error middleware..
app.use(errorMiddleware);

