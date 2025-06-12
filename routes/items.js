const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items');

const validate = require('../middlewares/validate');

const { isAuthenticated } = require('../middlewares/authenticate');
// router.get('/', isAuthenticated, itemsController.getAllItems);

router.get('/', itemsController.getAllItems);


//CHANGE THE NEXT LINE TO router.post('/', validate.saveContact, itemsController.createItem);
router.post('/',isAuthenticated, validate.validateItem, itemsController.createItem);
// router.post('/', itemsController.createItem);

router.get('/:id', itemsController.getItemById);


//CHANGE THE NEXT LINE TO router.put('/:id', validate.saveContact, itemsController.updateItem);
router.put('/:id', isAuthenticated, validate.validateItem, itemsController.updateItem)
// router.put('/:id', itemsController.updateItem);

router.delete('/:id',isAuthenticated, itemsController.deleteItem);

module.exports = router;