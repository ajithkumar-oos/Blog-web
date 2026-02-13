import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  comments: [
    { text: String, createdAt: { type: Date, default: Date.now } },
  ],
});

export default mongoose.model("User", UserSchema);
