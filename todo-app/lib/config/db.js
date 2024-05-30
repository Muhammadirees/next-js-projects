import mongoose from "mongoose";
export const ConnectDB = async () => {
  await mongoose.connect("mongodb+srv://todo-user-1:NS0hPhfyVqawWw36@cluster0.jkvyyc9.mongodb.net/todo-app");
  console.log("DB connection Successfull");
};
