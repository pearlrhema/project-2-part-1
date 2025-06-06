const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all items
const getAllItems = async (req, res) => {
  // #swagger.tags = ['items'];
  // #swagger.description = 'Get all items'
  const result = await mongodb.getdatabase().db().collection("items").find();
  result.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

// GET item by ID
const getItemById = async (req, res) => {
  // #swagger.tags = ['items'];
  // #swagger.description = 'Get item by ID'
  const itemId = req.params.id;
  if (!ObjectId.isValid(itemId)) {
    return res.status(400).json({ error: 'Oops! That item ID doesn’t look right. Please double-check it and try again.' });
  }

  try {
    const item = await mongodb.getdatabase().db().collection("items").findOne({ _id: new ObjectId(itemId) });
    if (!item) return res.status(404).json({ error: 'We couldn’t find a item with that ID. Please check and try again.' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while retrieving the item. Please try again later.' });
  }
};

// POST create item
const createItem = async (req, res) => {
  // #swagger.tags = ['items'];
  // #swagger.description = 'Create a new item'
  const newItem = {
    foodName: req.body.foodName,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    description: req.body.description, 
    price: req.body.price,
    availability: req.body.availability,
    brand: req.body.brand,
  };

  try {
    const result = await mongodb.getdatabase().db().collection("items").insertOne(newItem);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'We couldn’t save the new item. Please try again later.' });
  }
};

// PUT update item
const updateItem = async (req, res) => {
  // #swagger.tags = ['items'];
  // #swagger.description = 'Update a item'
  const itemId = req.params.id;
  if (!ObjectId.isValid(itemId)) {
    return res.status(400).json({ error: 'Hmm... The ID you provided seems off. Could you verify it and try updating again?' });
  }

  const updateditem = {
    foodName: req.body.foodName,
    category: req.body.category, 
    imageUrl: req.body.imageUrl, 
    description: req.body.description, 
    price: req.body.price,
    availability: req.body.availability,
    brand: req.body.brand, 
  };

  try {
    const result = await mongodb.getdatabase().db().collection("items").updateOne(
      { _id: new ObjectId(itemId) },
      { $set: updateditem }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'We couldn’t find a item with that ID. Please check and try again.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while updating the item. Please try again later.' });
  }
};

// DELETE item
const deleteItem = async (req, res) => {
  // #swagger.tags = ['items'];
  // #swagger.description = 'Delete a item'
  const itemId = req.params.id;
  if (!ObjectId.isValid(itemId)) {
    return res.status(400).json({ error: 'We couldn’t recognize that item ID. Please check and try deleting again.' });
  }

  try {
    const result = await mongodb.getdatabase().db().collection("items").deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No item found with the provided ID. Nothing was deleted.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while deleting the item. Please try again later.' });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
