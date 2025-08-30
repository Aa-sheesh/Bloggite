import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Subscriber = mongoose.models.subscriber ||  mongoose.model('subscriber',subscriberSchema);