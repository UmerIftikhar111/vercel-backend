const jwt = require('jsonwebtoken')
require('dotenv').config()
const {verifyuserloggedin,checkAdmin} = require('../authenticate')
const {searchLostItem,returnLostItem, getLostItems, addLostItem} = require('../Controller/LostItemController')

const LostItemRouter = require("express").Router()

LostItemRouter.get( "/search-item" , searchLostItem )
LostItemRouter.post( "/add-item" , addLostItem )
LostItemRouter.post( "/return-item" , returnLostItem )
LostItemRouter.get( "/get-lost-items", getLostItems )

module.exports = LostItemRouter