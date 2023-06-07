const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
