
const express = require('express')
const hotelRouter = express.Router()
const {addHotel,getAllRooms,getAllAvailableRooms } = require('../Controller/hotelController')
const {verifyuserloggedin,checkRole} = require('../middleware/auth')

// Route to add a hotel
hotelRouter.post('/add-hotel', verifyuserloggedin, checkRole("admin") , addHotel);

// Route to get all rooms of a hotel
hotelRouter.get('/:hotelId/rooms', verifyuserloggedin, getAllRooms);
  
// Route to get available rooms of a hotel on the current date
hotelRouter.get('/:hotelId/available-rooms', verifyuserloggedin , getAllAvailableRooms);


module.exports = hotelRouter
