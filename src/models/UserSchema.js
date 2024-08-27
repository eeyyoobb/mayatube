import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userQuizSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isLogged: {
    type: Boolean,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.models.UserQuiz || mongoose.model('UserQuiz', userQuizSchema);

export default User;
