const jwt = require('jsonwebtoken')
require('dotenv').config()
const {verifyuserloggedin,checkAdmin} = require('../authenticate')
const {markAsComplete, getPendingCleaningSchedules, roomCleaning} = require('../Controller/RoomCleaningController')

const CleaningRouter = require("express").Router()

CleaningRouter.post( "/book-cleaning-schedule" , roomCleaning )
CleaningRouter.get( "/get-cleaning-schedule" , getPendingCleaningSchedules )
CleaningRouter.get( "/mark-cleaning-complete/:id", markAsComplete )

module.exports = CleaningRouter