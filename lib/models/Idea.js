import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    details: { type: String },
    status: { type: String, default: "💡 Idea" }, // e.g., 🚀 In Progress
  },
  { timestamps: true }
);

export default mongoose.models.Idea || mongoose.model("Idea", ideaSchema);
