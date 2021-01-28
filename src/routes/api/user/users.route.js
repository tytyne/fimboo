
import express from "express";
import userController from "../../../controllers/user.controller";
import authMiddleware from "../../../middlewares/emailUsername.js";
import userValidator from "../../../validation/userValidation"
import passport from "passport";
const { checkEmailExist,checkUsernameExist } = authMiddleware;
import AuthControllers from "../../../controllers/socialMedia.controller";
import resetController from "../../../controllers/reset.controller"
import subscribeController from "../../../controllers/subscriptionController"
import {upload} from '../../../utils/multer';
import profileController from "../../../controllers/user.profile.controller"
import authentication from "../../../middlewares/authentication"
import authorization from '../../../middlewares/userAuthorization';

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/signup",userValidator.signup,[checkEmailExist,checkUsernameExist],userController.signup);
router.post("/resend",userValidator.emailVerify,userController.resend)
router.get("/confirmation/:token",userController.confirmation);
router.post("/login",userValidator.login,userController.login)
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/redirect/",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/login/facebook/redirect/",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/api");
});

router.get("/profile/me",authentication,profileController.me)

router.patch("/update/profile",authentication,upload.single('profilePicture'),checkUsernameExist,profileController.editProfile)
router.get("/view/profile/:id",authorization.userAuthorize,profileController.viewProfile)
router.get("/profile/me",authentication,profileController.me)
router.get("/profile/all",authorization.userAuthorize, profileController.allProfile)
router.post("/profile/rememberMe/:state",authentication,profileController.rememberProfile)

router.post("/change_password",authentication,userValidator.changePasswordTemplate,profileController.changePassword)
router.post("/forgot_password",userValidator.emailVerify,resetController.forgetPassword)
router.post("/reset_password/:token",userValidator.passwordTemplate,resetController.resetPassword)
router.get("/subscribe",subscribeController.subscribe)
router.get("/unsubscribe",subscribeController.unsubscribe)


export default router;
