import express from "express";
import userController from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.js";
import{validateSignup} from "../../middlewares/validatorMiddleware.js"
const { checkEmailExist,checkUsernameExist } = authMiddleware;

const router = express.Router();

router.get("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/user/signup",validateSignup,[checkEmailExist,checkUsernameExist],userController.signup);
router.post("/user/resend",userController.resend)
router.post("/user/confirmation/:token",userController.confirmation);


router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

export default router;