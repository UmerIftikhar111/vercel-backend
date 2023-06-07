const LostItem = require('../Models/LostItem');

// Add a new lost item
let addLostItem =  async (req, res) => {
  const { name, description, location } = req.body;

  try {
    // Create a new lost item
    const lostItem = new LostItem({
      name,
      description,
      location,
    });

    // Save the lost item to the database
    await lostItem.save();

    res.json({ message: 'Lost item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: couldnt save lost item' });
  }
}

// Get all lost items
let getLostItems =  async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    res.json(lostItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Return a lost item
let returnLostItem = async (req, res) => {
  const { id, returnDescription  } = req.body;
 

  try {
    const lostItem = await LostItem.findById(id);
    if (!lostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

    if (lostItem.isReturned) {
      return res.status(400).json({ message: 'Lost item is already returned' });
    }

    // Update the lost item to mark it as returned and set the return description
    lostItem.isReturned = true;
    lostItem.returnDescription = returnDescription;
    await lostItem.save();

    res.json({ message: 'Lost item returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: couldnt return lost item' });
  }
}

// Search a lost item
let searchLostItem =  async (req, res) => {
    const { name } = req.query;
    try {
      const lostItems = await LostItem.find({ name: { $regex: name, $options: 'i' } });
      res.json(lostItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error: couldnt find such item' });
    }
  }



module.exports = {
    searchLostItem,
    returnLostItem,
    getLostItems,
    addLostItem
}
