const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags = ['Godwin Essien Items Project']
  res.send('CSE341 - Godwin Essien Project 2 part 1');
});

router.use('/items', require('./items'));

router.use('/utensils', require('./utensils'));


// router.use('/createContacts', createContact);

module.exports = router;