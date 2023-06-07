const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactInformation: {
    type: String,
    required: true,
    unique: true,
  },
  availableRoomTypes: {
    type: [String],
    required: true
  },
  // pricing: {
  //   type: Number,
  //   required: true
  // },
  amenities: {
    type: [String],
    required: true
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
