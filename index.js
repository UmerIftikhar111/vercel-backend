const express =  require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors');
const InventoryRouter = require('./Routes/InventoryRoutes')
const LostItemRouter = require('./Routes/LostItemRoutes')
const InspectionRouter = require('./Routes/RoomInspectionRoutes')
const CleaningRouter = require('./Routes/RoomCleaningRoutes')
const userroute = require('./Routes/userroute')
const roomRouter = require('./Routes/roomRoute')
const hotelRouter = require('./Routes/hotelRoute')
const {validate} = require('./middleware/auth')



mongoose.connect(process.env.mongo_url).then( ()=>{
    console.log("DB connected")
} ).catch( err=>{
    console.log(err)
}) 

const app = express()
app.use(express.json())
app.use(cors());
app.get('/', (req,res) => {
    res.send('hi there!!')
})
app.use('/verifytoken',validate)


app.use('/inventory',InventoryRouter);
app.use('/lostAndfound',LostItemRouter);
app.use('/inspection',InspectionRouter);
app.use('/cleaning',CleaningRouter);

//redirecting to user route
app.use('/users', userroute)
app.use('/rooms', roomRouter)
app.use('/hotels', hotelRouter)

app.listen( process.env.port || 3000 ,()=>{
    console.log(`Server up at http://${process.env.url}:${process.env.port}`)
});

