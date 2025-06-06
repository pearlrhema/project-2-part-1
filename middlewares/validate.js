const validator = require('../helpers/validate');

const validateItem = (req, res, next) => {
  const rules = {
    foodName: 'required|string',
    category: 'required|string',
    imageUrl: 'required|url',
    description: 'required|string',
    price: 'required|numeric',
    availability: 'required|string',
    brand: 'required|string'
  };

  const customMessages = {
    'foodName.required': 'Food name is required.',
    'foodName.string': 'Food name must be a valid string.',
    'category.required': 'Category is required.',
    'category.string': 'Category must be a valid string.',
    'imageUrl.required': 'Image URL is required.',
    'imageUrl.url': 'Image URL must be a valid URL.',
    'description.required': 'Description is required.',
    'description.string': 'Description must be a valid string.',
    'price.required': 'Price is required.',
    'price.numeric': 'Price must be a numeric value.',
    'availability.required': 'Availability status is required.',
    'availability.string': 'Availability must be a valid string.',
    'brand.required': 'Brand is required.',
    'brand.string': 'Brand must be a valid string.'
  };

  validator(req.body, rules, customMessages, (err, status) => {
    if (!status) {
      return res.status(400).json({
        error: 'Validation failed for item.',
        details: err
      });
    }
    next();
  });
};

//validate utensil
const validateUtensil = (req, res, next) => {
  const rules = {
    productName: 'required|string',
    category: 'required|string',
    imageSource: 'required|string',
    description: 'required|string',
    price: 'required|numeric',
    availability: 'required|string',
    brand: 'required|string'
  };

  const customMessages = {
    'productName.required': 'Product name is required.',
    'productName.string': 'Product name must be a valid string.',
    'category.required': 'Category is required.',
    'category.string': 'Category must be a valid string.',
    'imageSource.required': 'Image URL is required.',
    'imageSource.url': 'Image URL must be a valid URL.',
    'description.required': 'Description is required.',
    'description.string': 'Description must be a valid string.',
    'price.required': 'Price is required.',
    'price.numeric': 'Price must be a numeric value.',
    'availability.required': 'Availability is required.',
    'availability.string': 'Availability must be a string.',
    'brand.required': 'Brand is required.',
    'brand.string': 'Brand must be a valid string.'
  };

  validator(req.body, rules, customMessages, (err, status) => {
    if (!status) {
      return res.status(400).json({
        error: 'Validation failed for utensil.',
        details: err
      });
    }
    next();
  });
};

module.exports = {
  validateItem,
  validateUtensil
};