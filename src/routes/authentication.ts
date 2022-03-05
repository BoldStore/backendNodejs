import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import {
  generateTokens,
  login,
  refreshToken,
  signup,
} from "../controllers/authentication";
const router = express.Router();

router.route("/").post(login);

router.route("/signup").post(signup);

router.route("/refreshToken").get(isLoggedIn, refreshToken);
router.route("/generateTokens").get(isLoggedIn, generateTokens);

export = router;
