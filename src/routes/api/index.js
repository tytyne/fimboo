import express from "express";
import User from "./users.route";
import Business from "./business.route"
import BusinessCategory from "./businessCategory.routes"
import Profile from "./profile.route"

const router = express.Router();

router.use("/", User);
router.use("/",Profile)
router.use("/", BusinessCategory)
router.use("/",Business)

export default router;
