import Profile from "../db/profileModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import upload from "../middlewares/multer.js";


export const createProfile = asyncHandler(async (req, res) => {
  try {
    const { name, address, description } = req.body;

    
    const uploadedImage = req.file ? req.file.path : null; 

    const profile = new Profile({
      name,
      address,
      description,
      profilePic: uploadedImage,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully!", profile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating profile", error: error.message });
  }
});

export const getProfiles = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profiles", error: error.message });
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  try {
    const profileId = req.params.id;

    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});
