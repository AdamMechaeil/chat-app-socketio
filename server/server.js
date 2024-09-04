const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
dotenv.config({path:"./config/config.env"});
const app=express();
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.get("/",(req,res)=>{
    res.send("Welcome To notes app")
})
app.use("/auth",authRouter);
app.use("/user",userRouter)
app.listen(process.env.PORT,()=>{
    console.log("Server is running");
})