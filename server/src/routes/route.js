import express from "express";
import { getImage, uploadImage } from "../controller/imageController.js";
import { signupUser, loginUser } from "../controller/userController.js"; // should contain extension
import  upload  from "../../utils/upload.js";
const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get('/file/:filename', getImage);
export default router;
