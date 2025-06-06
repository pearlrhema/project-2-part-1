const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items');

const validate = require('../middlewares/validate');

router.get('/', itemsController.getAllItems);


//CHANGE THE NEXT LINE TO router.post('/', validate.saveContact, itemsController.createItem);
router.post('/', validate.validateItem, itemsController.createItem);
// router.post('/', itemsController.createItem);

router.get('/:id', itemsController.getItemById);


//CHANGE THE NEXT LINE TO router.put('/:id', validate.saveContact, itemsController.updateItem);
router.put('/:id', validate.validateItem, itemsController.updateItem)
// router.put('/:id', itemsController.updateItem);

router.delete('/:id', itemsController.deleteItem);

module.exports = router;