import express from 'express';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrowings', borrowRoutes);

export default app;
