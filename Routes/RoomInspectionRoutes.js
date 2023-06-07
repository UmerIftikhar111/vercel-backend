const jwt = require('jsonwebtoken')
require('dotenv').config()
const {verifyuserloggedin,checkAdmin} = require('../authenticate')
const {markAsComplete, cancelInspection, getPendingInspections, bookInspection} = require('../Controller/RoomInspectionController')

const InspectionRouter = require("express").Router()

InspectionRouter.post( "/book-inspection" , bookInspection )
InspectionRouter.get( "/get-inspections" , getPendingInspections )
InspectionRouter.get( "/cancel-inspection/:id" , cancelInspection )
InspectionRouter.get( "/mark-inspection-complete/:id", markAsComplete )

module.exports = InspectionRouter