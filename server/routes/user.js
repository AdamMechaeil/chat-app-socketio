const express = require("express");
const {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  receivedRequests,
} = require("../controllers/user");
const { authenticator } = require("../middlewares/authenticator");
const userRouter = express.Router();

userRouter.get("/getAllUsers", authenticator, getUsers);
userRouter.get("/getUserById/:id", authenticator, getUserById);
userRouter.put("/updateUser/:id", authenticator, updateUser);
userRouter.delete("/deleteUser/:id", authenticator, deleteUser);
userRouter.get("/receivedRequests", authenticator, receivedRequests);

module.exports = userRouter;
