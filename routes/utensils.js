const express = require('express');
const router = express.Router();
const utensilsController = require('../controllers/utensils');
const { validateUtensil } = require('../middlewares/validate');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/',utensilsController.getAllUtensils);
router.get('/:id', utensilsController.getUtensilById);
router.post('/', isAuthenticated,validateUtensil, utensilsController.createUtensil);
router.put('/:id',isAuthenticated, validateUtensil, utensilsController.updateUtensil);
router.delete('/:id',isAuthenticated, utensilsController.deleteUtensil);

module.exports = router;
