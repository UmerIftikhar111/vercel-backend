
const Hotel = require('../Models/hotelModel');
const Room = require('../Models/roomModel');
const Reservation = require('../Models/reservationModel')

//hello
// function to add a new hotel
const addHotel = async (req, res) => {
    try {
      const { name, address, contactInformation, availableRoomTypes, amenities } = req.body;
      const hotel = new Hotel({
        name,
        address,
        contactInformation,
        availableRoomTypes,
        amenities
      });
      const newHotel = await hotel.save();
      res.status(201).json(newHotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add a hotel' });
    }
};

const getAllRooms =async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await Room.find({ hotel: hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
}

// Function to get available rooms of a hotel on the current date
const getAllAvailableRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const currentDate = new Date();
    
    // Query reservations for the current date
    const reservations = await Reservation.find({
      room: { $in: await Room.find({ hotel: hotelId }) },
      checkInDate: { $lte: currentDate },
      checkOutDate: { $gt: currentDate }
    });
    
    // Get the IDs of reserved rooms
    const reservedRoomIds = reservations.map(reservation => reservation.room);
    
    // Query available rooms for the hotel that are not reserved on the current date
    const availableRooms = await Room.find({
      hotel: hotelId,
      availability: true,
      _id: { $nin: reservedRoomIds }
    });
    
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available rooms. '+error });
  }
}

module.exports = {addHotel,getAllRooms, getAllAvailableRooms}