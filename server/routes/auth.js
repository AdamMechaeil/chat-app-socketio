const express=require("express");
const { signin, signup, checkLogin } = require("../controllers/auth");
const authRouter=express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signup",signup);
authRouter.post("/checkLogin",checkLogin);
// authRouter.put("/forgotPassword/:id",updatePassword);
// authRouter.post("/findUserByEmail",findUserByEmail);
// authRouter.post("/generateOtp",generateOtp);
// authRouter.post("/verifyOtp",verifyOtp);

module.exports=authRouter