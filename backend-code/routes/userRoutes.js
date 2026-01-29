const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  exportToCsv
} = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

// Search and Export must come before :id routes
router.get('/search', searchUsers);
router.get('/export', exportToCsv);

router.route('/')
  .get(getUsers)
  .post(validateUser, createUser);

router.route('/:id')
  .get(getUserById)
  .put(validateUser, updateUser)
  .delete(deleteUser);

module.exports = router;
