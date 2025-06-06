const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all Utensils
const getAllUtensils = async (req, res) => {
  // #swagger.tags = ['Utensils'];
  // #swagger.description = 'Get all Utensils'
  const result = await mongodb.getdatabase().db().collection("Utensils").find();
  result.toArray().then((Utensils) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Utensils);
  });
};

// GET utensil by ID
const getUtensilById = async (req, res) => {
  // #swagger.tags = ['Utensils'];
  // #swagger.description = 'Get utensil by ID'
  const utensilId = req.params.id;
  if (!ObjectId.isValid(utensilId)) {
    return res.status(400).json({ error: 'Invalid utensil ID.' });
  }

  try {
    const utensil = await mongodb.getdatabase().db().collection("Utensils").findOne({ _id: new ObjectId(utensilId) });
    if (!utensil) return res.status(404).json({ error: 'Utensil not found.' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(utensil);
  } catch (err) {
    res.status(500).json({ error: 'Server error while retrieving utensil.' });
  }
};

// POST utensil
const createUtensil = async (req, res) => {
  // #swagger.tags = ['Utensils'];
  // #swagger.description = 'Create a new utensil'
  const newUtensil = {
    productName: req.body.productName,
    category: req.boody.category,
    imageSource: req.body.imageSource,
    description: req.body.description,
    price: req.body.price,
    availabilty: req.body.availabilty,
    brand: req.body.brand
  };

  try {
    const result = await mongodb.getdatabase().db().collection("Utensils").insertOne(newUtensil);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create utensil.' });
  }
};

// PUT utensil
const updateUtensil = async (req, res) => {
  // #swagger.tags = ['Utensils'];
  // #swagger.description = 'Update a utensil'
  const utensilId = req.params.id;
  if (!ObjectId.isValid(utensilId)) {
    return res.status(400).json({ error: 'Invalid utensil ID.' });
  }

  const updatedUtensil = {
    productName: req.body.productName,
    category: req.boody.category,
    imageSource: req.body.imageSource,
    description: req.body.description,
    price: req.body.price,
    availabilty: req.body.availabilty,
    brand: req.body.brand
  };

  try {
    const result = await mongodb.getdatabase().db().collection("Utensils").updateOne(
      { _id: new ObjectId(utensilId) },
      { $set: updatedUtensil }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Utensil not found.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update utensil.' });
  }
};

// DELETE utensil
const deleteUtensil = async (req, res) => {
  // #swagger.tags = ['Utensils'];
  // #swagger.description = 'Delete a utensil'
  const utensilId = req.params.id;
  if (!ObjectId.isValid(utensilId)) {
    return res.status(400).json({ error: 'Invalid utensil ID.' });
  }

  try {
    const result = await mongodb.getdatabase().db().collection("Utensils").deleteOne({ _id: new ObjectId(utensilId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Utensil not found.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete utensil.' });
  }
};

module.exports = {
  createUtensil,
  getAllUtensils,
  getUtensilById,
  updateUtensil,
  deleteUtensil
};
