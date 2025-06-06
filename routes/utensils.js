const express = require('express');
const router = express.Router();
const utensilsController = require('../controllers/utensils');
const { validateUtensil } = require('../middlewares/validate');

router.get('/',utensilsController.getAllUtensils);
router.post('/',validateUtensil, utensilsController.createUtensil);
router.get('/:id', utensilsController.getUtensilById);
router.put('/:id',validateUtensil, utensilsController.updateUtensil);
router.delete('/:id', utensilsController.deleteUtensil);

module.exports = router;
