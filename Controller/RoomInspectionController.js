const RoomInspection = require('../Models/RoomInspection');

// Book a room inspection
let bookInspection =  async (req, res) => {
  const { roomNumber, date } = req.body;

  try {
    // Create a new room inspection
    const roomInspection = new RoomInspection({
      roomNumber,
      date,
    });

    // Save the room inspection to the database
    await roomInspection.save();

    res.json({ message: 'Room inspection booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Get all pending room inspections
let getPendingInspections =  async (req, res) => {
  try {
    const pendingInspections = await RoomInspection.find({ status: 'Pending' });
    res.json(pendingInspections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Cancel a room inspection
let cancelInspection =  async (req, res) => {
  const { id } = req.params;

  try {
    const roomInspection = await RoomInspection.findById(id);
    if (!roomInspection) {
      return res.status(404).json({ message: 'Room inspection not found' });
    }

    if (roomInspection.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot cancel a completed or cancelled room inspection' });
    }

    // Update the room inspection status to 'Cancelled'
    roomInspection.status = 'Cancelled';
    await roomInspection.save();

    res.json({ message: 'Room inspection cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Mark a room inspection as complete
let markAsComplete =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const roomInspection = await RoomInspection.findById(id);
      if (!roomInspection) {
        return res.status(404).json({ message: 'Room inspection not found' });
      }
  
      if (roomInspection.status !== 'Pending') {
        return res.status(400).json({ message: 'Cannot mark a completed or cancelled room inspection as complete' });
      }
  
      // Update the room inspection status to 'Completed'
      roomInspection.status = 'Completed';
      await roomInspection.save();
  
      res.json({ message: 'Room inspection marked as complete' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
module.exports = {
    markAsComplete,
    cancelInspection,
    getPendingInspections,
    bookInspection

}
