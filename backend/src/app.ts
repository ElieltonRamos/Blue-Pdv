import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import productRoutes from './routes/productRoutes';
import saleRouter from './routes/saleRoutes';
import reportSaleRouter from './routes/reportSaleRoutes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send({ message: 'backend is running!' });
});

app.use('/api/user', userRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/product', productRoutes);
app.use('/api/sale', saleRouter);
app.use('/api/report', reportSaleRouter);

export default app;
