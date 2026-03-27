// Require express
const express = require('express');

// Create a router instance
const router = express.Router();

// In-memory array to store users
let users = [];

// Counter for user IDs
let nextId = 1;

// Route to display the list of users
router.get('/', (req, res) => {
  res.render('list', { users });
});

// Route to display the new user form
router.get('/new', (req, res) => {
  res.render('new');
});

// Route to handle new user creation
router.post('/', (req, res) => {
  const { first, last, gender, age } = req.body;
  users.push({ id: nextId++, first, last, gender, age: parseInt(age) });
  res.redirect('/users');
});

// Route to display a specific user's details
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.render('user', { user });
  } else {
    res.status(404).send('User not found');
  }
});

// Export the router
module.exports = router;