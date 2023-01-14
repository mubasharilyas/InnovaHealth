


import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
      errorId: String,
      errorSeverity: String,
      errorCategory: String,
      errorMessage: String,
      longMessage: String,
      errorTime: Number,
      selected: Boolean,
      new: Boolean,
      expanded: Boolean
})

export const Alert = mongoose.model('Alert',alertSchema);
