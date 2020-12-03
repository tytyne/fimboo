import express from "express";
import profileController from "../../controllers/user.profile.controller"
import authentication from "../../middlewares/authentication"
const router = express.Router();


router.get("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.get("/view/profile/:id",authentication,profileController.viewProfile)
router.get("/profile/me",authentication,profileController.me)
router.get("/profile/all",profileController.allProfile)
router.put("/update/profile",authentication,profileController.editProfile)
router.post("/user/change_password",authentication,profileController.changePassword)



router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

export default router;