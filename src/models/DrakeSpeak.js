import mongoose from 'mongoose';

const s = new mongoose.Schema({
  body: String,
  userID: String
});

export default mongoose.model('DrakeSpeak', s);
