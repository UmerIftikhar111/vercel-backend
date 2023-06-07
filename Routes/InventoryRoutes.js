const jwt = require('jsonwebtoken')
require('dotenv').config()
const {verifyuserloggedin,checkAdmin} = require('../authenticate')
const {placeOrder,getOrders,getInventory, getSpecificInventoryItem,searchInventoryByName,searchInventoryByCategory,addItem,deleteInventoryItem,updateInventoryItem} = require('../Controller/InventoryController')

const InventoryRouter = require("express").Router()

InventoryRouter.post( "/add-item" , addItem )
InventoryRouter.post( "/place-order" , placeOrder )
InventoryRouter.get( "/get-inventory" , getInventory )
InventoryRouter.get( "/get-orders" , getOrders )
InventoryRouter.get( "/get-specific-item", getSpecificInventoryItem )
InventoryRouter.get('/search-inventory/category', searchInventoryByCategory)
InventoryRouter.get('/search-inventory/name', searchInventoryByName)
InventoryRouter.get('/remove-item', deleteInventoryItem)
InventoryRouter.post( "/update-item" , updateInventoryItem )



module.exports = InventoryRouter