const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getMyBooks,
  addMyBook,
  updateStatus,
  updateRating
} = require('../controllers/myBooksController');

router.use(authMiddleware);

router.get('/', getMyBooks);
router.post('/:bookId', addMyBook);
router.patch('/:bookId/status', updateStatus);
router.patch('/:bookId/rating', updateRating);

module.exports = router;
