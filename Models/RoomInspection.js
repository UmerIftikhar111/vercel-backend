
const mongoose = require('mongoose');

const roomInspectionSchema = new mongoose.Schema({
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
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
});

const RoomInspection = mongoose.model('RoomInspection', roomInspectionSchema);

module.exports = RoomInspection;
