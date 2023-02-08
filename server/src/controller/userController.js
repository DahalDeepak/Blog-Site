import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();
export const signupUser = async (request, response) => {
  try {
    const checkDuplicate = await User.findOne({ email: request.body.email });
    if (checkDuplicate) {
      response.json({
        msg: "User already exist, try login",
      });
    } else {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      if (hashedPassword) {
        const user = {
          name: request.body.name,
          email: request.body.email,
          password: hashedPassword,
        };
        const newUser = await User.create(user);
        // const newUser = new User(user);
        await newUser.save();

        if (newUser) {
          return response.status(200).json({ msg: "signup sucessfull" });
        } else {
          return response.status(500).json({ msg: "sth went wrong " });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "error while saving to db" });
  }
  // next()
};
export default signupUser;
export const loginUser = async (request, response) => {
  let user = await User.findOne({ email: request.body.email });
  // console.log(request.body.email);
  if (!user) {
    return response.status(400).json({ msg: "email didnot match" });
  } else {
    try {
      let match = await bcrypt.compare(request.body.password, user.password);

      if (match) {
        const accessToken = jwt.sign(
          user.toJSON(),
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_SECRET_KEY
        );
        // debugger;
        const newToken = new Token({ token: refreshToken });
        await newToken.save();
        // console.log(newToken);
        response.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          email: user.email,
        });
      } else {
        response.status(400).json({ msg: "Password does not match" });
      }
    } catch (error) {
      response.status(500).json({ msg: "error while login the user" });
    }
  }
};
export const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};
