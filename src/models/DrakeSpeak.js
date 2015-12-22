import mongoose from 'mongoose';

const s = new mongoose.Schema({
  quote: String,
  source: String,
  user_id: String,
});

export default mongoose.model('DrakeSpeak', s);
