const RoomCleaning = require('../Models/RoomCleaning');

// Schedule room cleaning
let roomCleaning = async (req, res) => {
  const { roomNumber, date } = req.body;

  try {
    // Create a new room cleaning schedule
    const roomCleaning = new RoomCleaning({
      roomNumber,
      date,
    });

    // Save the room cleaning schedule to the database
    await roomCleaning.save();

    res.json({ message: 'Room cleaning scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Get all pending room cleaning schedules
let getPendingCleaningSchedules =  async (req, res) => {
  try {
    const pendingCleanings = await RoomCleaning.find({ status: 'Pending' });
    res.json(pendingCleanings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Mark room cleaning as complete
let markAsComplete = async (req, res) => {

  const { id } = req.params;

  try {
    const roomCleaning = await RoomCleaning.findById(id);
    if (!roomCleaning) {
      return res.status(404).json({ message: 'Room cleaning schedule not found' });
    }

    if (roomCleaning.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot mark a completed room cleaning as complete' });
    }

    // Update the room cleaning status to 'Completed'
    roomCleaning.status = 'Completed';
    await roomCleaning.save();

    res.json({ message: 'Room cleaning marked as complete' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
    markAsComplete,
    getPendingCleaningSchedules,
    roomCleaning
};
