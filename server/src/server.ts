import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/user';
import visitRoutes from './routes/visit';
import clinicRoutes from './routes/clinic';
import contactRoutes from './routes/contact';
import discountRoutes from './routes/discount';
import reportRoutes from './routes/report';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/users', userRoutes);
app.use('/visits', visitRoutes);
app.use('/clinics', clinicRoutes);
app.use('/contacts', contactRoutes);
app.use('/discounts', discountRoutes);
app.use('/reports', reportRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
