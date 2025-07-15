import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  content: { type: String },
  image: { type: String },
  date: { type: String },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
