// lostItem.js

const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  returnDescription: {
    type: String,
    default: '',
  },
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
