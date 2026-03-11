import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/db.js';
import leaderboardRoutes from './routes/LeaderboardRoute.js';
import stripeRoutes from './routes/StripeRoute.js';
import webhookRoutes from './routes/WebhookRoute.js';
import authRoutes from './routes/AuthRoute.js';
import locationRoutes from './routes/LocationRoute.js';
import morgan from 'morgan';

dotenv.config();
connectDB();

const app = express();

app.use('/api/webhook', webhookRoutes);

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://heartfelt-baklava-f31fe7.netlify.app',
		],
		credentials: true,
	}),
);

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
