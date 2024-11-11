const Book =require('../models/Books');



// Get all books
const getBooks = async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get single book
  const getBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create book
  const createBook = async (req, res) => {
    try {
      const { name, author, isbn, publishedYear } = req.body;
      
      // Check if book with ISBN already exists
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
      
      const book = await Book.create({
        name,
        author,
        isbn,
        publishedYear
      });
      
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update book
  const updateBook = async (req, res) => {
    try {
      const { name, author, isbn, publishedYear } = req.body;
      const book = await Book.findById(req.params.id);
      
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      // Check if updating ISBN and if it already exists
      if (isbn !== book.isbn) {
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
          return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }
      }
      
      book.name = name || book.name;
      book.author = author || book.author;
      book.isbn = isbn || book.isbn;
      book.publishedYear = publishedYear || book.publishedYear;
      
      const updatedBook = await book.save();
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete book
  const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      await book.deleteOne();
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Export all functions
  module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
  };
  
