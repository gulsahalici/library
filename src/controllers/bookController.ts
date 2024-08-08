import { Request, Response } from 'express';
import Book from '../models/Book';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const book = await Book.create({ title, author });
  res.status(201).json(book);
};
