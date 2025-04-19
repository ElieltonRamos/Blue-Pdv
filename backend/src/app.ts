import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send({ message: 'backend is running!' });
});

app.use('/api/user', userRoutes);
app.use('/api/client', clientRoutes);

export default app;
