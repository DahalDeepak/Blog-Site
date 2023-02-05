import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
/////////////////////////////////
////////////////////////
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// import mongoose from "mongoose";
// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { collection: "users" }
// );

// const user = mongoose.model("user", usersSchema);
// export default user;
