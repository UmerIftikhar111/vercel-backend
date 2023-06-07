const mongoose = require('mongoose');

const roomCleaningSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
});

const RoomCleaning = mongoose.model('RoomCleaning', roomCleaningSchema);

module.exports = RoomCleaning;
