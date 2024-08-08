import { Request, Response } from 'express';
import Borrow from '../models/Borrow';
import Book from '../models/Book';
import User from '../models/User';

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const book = await Book.findByPk(bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const existingBorrow = await Borrow.findOne({ where: { bookId, returnDate: null } });
  if (existingBorrow) {
    return res.status(400).json({ message: 'Book is already borrowed' });
  }

  const borrow = await Borrow.create({
    userId,
    bookId,
    borrowDate: new Date(),
  });

  res.status(201).json(borrow);
};

export const returnBook = async (req: Request, res: Response) => {
  const { userId, bookId, rating } = req.body;

  const borrow = await Borrow.findOne({ where: { userId, bookId, returnDate: null } });
  if (!borrow) {
    return res.status(404).json({ message: 'Borrow record not found' });
  }

  borrow.returnDate = new Date();
  borrow.rating = rating;
  await borrow.save();

  const book = await Book.findByPk(bookId);
  if (book) {
    const borrows = await Borrow.findAll({ where: { bookId, rating: { [Op.not]: null } } });
    const totalRatings = borrows.reduce((sum, borrow) => sum + borrow.rating!, 0);
    book.averageRating = totalRatings / borrows.length;
    await book.save();
  }

  res.json(borrow);
};
