const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['public', 'responder', 'admin'],
      default: 'public'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
