import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    profilePic: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
})

const Profile= mongoose.model("Profile", profileSchema);
export default Profile