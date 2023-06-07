const InventoryItem = require('../Models/InventoryItem');
const Order = require('../Models/Order');

// Get all inventory items

let getInventory = async (req, res) => {

  try {
    const inventory = await InventoryItem.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt fetch inventory' });
  }
}

// Get a specific inventory item by ID
let getSpecificInventoryItem = async (req, res) => {
  try {
    const { id }= req.query;
    const inventoryItem = await InventoryItem.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory Item not found' });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt fetch inventory item' });
  }
}

// Search for inventory items by name
let searchInventoryByName =  async (req, res) => {
  const { query } = req.query;
  try {
    const inventory = await InventoryItem.find({
      name: { $regex: query, $options: 'i' },
    });
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: No such inventory item found' });
  }
};

// Search for inventory items by category
let searchInventoryByCategory =  async (req, res) => {
  const { query } = req.query;
  try {
    const inventory = await InventoryItem.find({
      category: { $regex: query, $options: 'i' },
    });
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: No such inventory item found' });
  }
};

// Add a new item to the inventory
let addItem =  async (req, res) => {
    const { name, description, quantity, price, category } = req.body;
  
    try {
      // Create a new inventory item
      const inventoryItem = new InventoryItem({
        name,
        description,
        quantity,
        price,
        category
      });
  
      // Save the inventory item to the database
      await inventoryItem.save();
  
      res.json({ message: 'Item added to inventory successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Place an order for an inventory item
let placeOrder =  async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const inventoryItem = await InventoryItem.findById(itemId);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory Item not found' });
    }
    
    if(inventoryItem.quantity == 0 ){
      return res.status(400).json({ message: 'Inventory Item has not sufficient quantity' });
    }

    if(inventoryItem.quantity<quantity){
      
      const totalPrice = inventoryItem.price * inventoryItem.quantity;
      const order = new Order({
       itemId,
       quantity,
       totalPrice,
      });
      await order.save();
      inventoryItem.quantity = 0;
      await inventoryItem.save();
      return res.status(500).json({ message: `Inventory only has ${inventoryItem.quantity} items which have been ordered, please refill inventory` });
    }
    
    const totalPrice = inventoryItem.price * quantity;
    const order = new Order({
      itemId,
      quantity,
      totalPrice,
    });

    await order.save();
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a specific inventory item by ID
let deleteInventoryItem = async (req, res) => {
  const { id }= req.query;
  try {
    const result = await InventoryItem.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt delete inventory item' });
  }
}

// Update a specific inventory item by ID
let updateInventoryItem = async (req, res) => {
  const { id, qty }= req.body;
  try {
    const result = await InventoryItem.findById(id);

    if (!result) {
      return res.status(404).json({ message: 'Record not found' });
    }
    result.quantity = qty;
    await result.save();

    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt update inventory item' });
  }
}

// Get all inventory items

let getOrders = async (req, res) => {

  try {
    const ordersData = await Order.find();
    res.status(200).json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt fetch orders' });
  }
}

module.exports = {
    placeOrder
    ,getInventory,
    getSpecificInventoryItem,
    searchInventoryByName,
    searchInventoryByCategory,
    addItem,
    deleteInventoryItem,
    updateInventoryItem,
    getOrders
}

