const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController.js');

const router = express.Router();

router.route('/').get(getBooks).post(createBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
