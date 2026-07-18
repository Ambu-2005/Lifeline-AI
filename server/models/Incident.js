const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['medical', 'fire', 'accident', 'flood', 'crime', 'other'],
      default: 'other'
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    reportedBy: {
      type: String,
      trim: true,
      default: 'Anonymous'
    },
    contactPhone: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open'
    },
    aiSummary: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Incident', incidentSchema);
