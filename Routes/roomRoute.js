
const express = require('express')
const roomRouter = express.Router()
const {verifyuserloggedin,checkRole} = require('../middleware/auth')

const {addRoom,reserverRoom, updateRoomType, updateRoomStatus, updateRoomAmenities, 
        updateRoomPrice, getBookingCalendar, getRoomNumbers } = require('../Controller/roomController')
    

// Route to add a room
roomRouter.post('/add-room', verifyuserloggedin, checkRole("admin") ,addRoom);

// Route to make a reservation
roomRouter.post('/reserve-room', verifyuserloggedin, reserverRoom);

//route to change room type
roomRouter.patch('/update-room-type', verifyuserloggedin, checkRole("admin") , updateRoomType);

//route to change availability status of room
roomRouter.patch('/update-room-status', verifyuserloggedin, checkRole("admin") , updateRoomStatus);

// Route to update the amenities of a room
roomRouter.patch('/update-room-amenities', verifyuserloggedin, checkRole("admin") , updateRoomAmenities);

// Route to update the price of a room
roomRouter.patch('/update-room-price', verifyuserloggedin, checkRole("admin") , updateRoomPrice);

//route to get all booking dates of a room
roomRouter.get('/:roomId/getBookingCalendar', verifyuserloggedin, getBookingCalendar);

roomRouter.get('/getAll', getRoomNumbers);

      

module.exports = roomRouter