const MyBook = require('../models/MyBook');
const Book = require('../models/Book');

exports.getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.userId }).populate('bookId');
    res.json(myBooks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMyBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const existing = await MyBook.findOne({ userId: req.userId, bookId });
    if (existing) return res.status(400).json({ message: 'Book already added' });

    const myBook = new MyBook({ userId: req.userId, bookId, status: 'Want to Read' });
    await myBook.save();

    res.status(201).json({ message: 'Book added to your list' });
    } catch {
    res.status(500).json({ message: 'Server error' });
    }
    };
    
    exports.updateStatus = async (req, res) => {
    try {
    const { bookId } = req.params;
    const { status } = req.body;
    const myBook = await MyBook.findOneAndUpdate(
    { userId: req.userId, bookId },
    { status },
    { new: true }
    );
    if (!myBook) return res.status(404).json({ message: 'Book not found in your list' });
    res.json(myBook);
    } catch {
    res.status(500).json({ message: 'Server error' });
    }
    };
    
    exports.updateRating = async (req, res) => {
    try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const myBook = await MyBook.findOneAndUpdate(
    { userId: req.userId, bookId },
    { rating },
    { new: true }
    );
    if (!myBook) return res.status(404).json({ message: 'Book not found in your list' });
    res.json(myBook);
    } catch {
    res.status(500).json({ message: 'Server error' });
    }
    };
   