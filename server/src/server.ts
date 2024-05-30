import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/user';
import visitRoutes from './routes/visit';
import clinicRoutes from './routes/clinic';
import contactRoutes from './routes/contact';
import discountRoutes from './routes/discount';
import reportRoutes from './routes/report';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/users', userRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
