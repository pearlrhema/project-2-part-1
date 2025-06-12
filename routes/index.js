const router = require('express').Router();

const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   // #swagger.tags = ['Godwin Essien Items Project']
//   res.send('CSE341 - Godwin Essien Project 2 part 1');
// });

router.use('/items', require('./items'));

router.use('/utensils', require('./utensils'));

router.get('/login', passport.authenticate('github'), (req, res) => {
  // #swagger.tags = ['GitHub Authentication']
  // #swagger.description = 'Login with GitHub'
  // This route will redirect to GitHub for authentication
});

router.get('/logout', function ( req, res, next) {
  // #swagger.tags = ['GitHub Authentication']
  // #swagger.description = 'Logout from GitHub'
  // This route will log out the user
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// router.use('/createContacts', createContact);

module.exports = router;