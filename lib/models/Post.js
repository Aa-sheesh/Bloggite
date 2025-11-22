// lib/models/Post.js
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body:{type:String,required:true},
  content: { type: String, required: true },
  thumbnail: { type: String },
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true, sparse: true },
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)
