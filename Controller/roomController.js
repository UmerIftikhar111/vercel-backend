
const Room = require('../Models/roomModel');
const Reservation = require('../Models/reservationModel');
const Hotel = require('../Models/hotelModel')
const User = require('../Models/userModel')

require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_KEY);

// function to add a room in hotel
const addRoom = async (req, res, next) => {
  try {
    const { roomNumber, type, availability, price, capacity, amenities, hotelId } = req.body;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const foundRoom = await Room.findOne({ roomNumber:roomNumber,hotel:hotel._id });

    if (foundRoom) {
      return res.status(409).json({ error: 'Room with the same room number already exists' });
    }

    
    const room = new Room({
      roomNumber,
      type,
      availability,
      price,
      capacity,
      amenities,
      hotel: hotel._id
    });

    const newRoom = await room.save();

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a room' + error });
  }
};


//function for payment process
const createPaymentIntent = async (amount, currency, description, cardDetails) => {
  
  // Create a payment method with the card details
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: cardDetails,
  });

  // Create a payment intent using the payment method
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    description,
    payment_method: paymentMethod.id,
    confirm: true,
  });

  return paymentIntent;
};

// function to make a room reservation
// function to make a room reservation
const reserverRoom = async (req, res, next) => {
  try {
    const { userId, roomId, checkInDate, checkOutDate, paymentMethod, cardDetails } = req.body;
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);

    if (!user || !room) {
      return res.status(404).json({ error: 'User or room not found' });
    }

    const hotel = await Hotel.findById(room.hotel);
    if (!hotel) {
      return res.status(404).json({ error: 'Associated hotel not found' });
    }

    // Convert check-in and check-out dates to Pakistan Standard Time (PST)
    const checkInPST = new Date(checkInDate).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    const checkOutPST = new Date(checkOutDate).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

    // Calculate total price based on the room price and duration of stay
    const durationInDays = Math.ceil((new Date(checkOutPST) - new Date(checkInPST)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * durationInDays;

    // Create a payment intent with Stripe (multiplying 'totalPrice' with 100 cuz it takes 2500 as 25)
    const paymentIntent = await createPaymentIntent(totalPrice * 100, 'usd', 'Payment for room reservation', cardDetails);

    // Handle successful payment
    if (paymentIntent.status === 'succeeded') {
      const reservation = new Reservation({
        user: user._id,
        room: room._id,
        checkInDate: checkInPST,
        checkOutDate: checkOutPST,
        totalPrice,
        paymentMethod,
        paymentId: paymentIntent.id, // Store the payment ID in the reservation
      });

      const newReservation = await reservation.save();

      res.status(201).json(newReservation);
    } else {
      res.status(500).json({ error: 'Payment processing failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to make a reservation ' + error });
  }
};


// const reserverRoom = async (req, res, next) => {
//     try {
//       const { userId, roomId, checkInDate, checkOutDate } = req.body;
//       const user = await User.findById(userId);
//       const room = await Room.findById(roomId);
      
//       if (!user || !room) {
//         return res.status(404).json({ error: 'User or room not found' });
//       }
      
//       const hotel = await Hotel.findById(room.hotel);
//       if (!hotel) {
//         return res.status(404).json({ error: 'Associated hotel not found' });
//       }
      
//       // Calculate total price based on the room price and duration of stay
//       const durationInDays = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
//       const totalPrice = room.price * durationInDays;
      
//       const reservation = new Reservation({
//         user: user._id,
// //        hotel:hotel._id,
//         room: room._id,
//         checkInDate,
//         checkOutDate,
//         totalPrice
//       });
  
//       const newReservation = await reservation.save();
//       res.status(201).json(newReservation);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to make a reservation '+error });
//     }
// };



// function to update the type of a room

const updateRoomType = async (req, res,next) => {
    try {
      const { roomId, type } = req.body;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      room.type = type;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room type' });
    }
};
  
  // function to update the status (availability) of a room
const updateRoomStatus = async (req, res,next) => {
    try {
      const { roomId, availability } = req.body;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      room.availability = availability;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room status' });
    }
};
  
// Controller function to update the amenities of a room
const updateRoomAmenities = async (req, res,next) => {
    try {
      const { roomId, amenities } = req.body;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      room.amenities = amenities;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room amenities' });
    }
};
  
  // Controller function to update the price of a room
const updateRoomPrice = async (req, res,next) => {
    try {
      const { roomId, price } = req.body;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      room.price = price;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room price' });
    }
};

// Function to get the booking calendar of a room
const getBookingCalendar = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    // Get the current date
    const currentDate = new Date();

    // Query reservations for the room starting from the current date
    const reservations = await Reservation.find({
      room: roomId,
      checkOutDate: { $gte: currentDate }
    });
    
    // Prepare the booking calendar by extracting the booking dates
    const bookingCalendar = reservations.map((reservation) => ({
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate
    }));
    
    res.json({bookingCalendar:bookingCalendar,roomNumber:room.roomNumber});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking calendar' });
  }
};

const getRoomNumbers = async (req, res) => {

  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

}

// export all the functions
module.exports = { addRoom, reserverRoom, updateRoomType, updateRoomStatus, updateRoomAmenities, 
                   updateRoomPrice, getBookingCalendar, getRoomNumbers}