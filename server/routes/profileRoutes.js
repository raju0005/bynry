import express from "express";
import upload from "../middlewares/multer.js";
import { createProfile, getProfile, getProfiles } from "../controllers/profileController.js";

const router = express.Router();

router.post("/admin_upload", upload.single("profilePic"), createProfile);
router.get('/profiles',getProfiles)
router.get('/profiles/:id', getProfile);

export default router;
