import { Router } from 'express';
import { getBooks, getBookById, createBook } from '../controllers/bookController';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);

export default router;
