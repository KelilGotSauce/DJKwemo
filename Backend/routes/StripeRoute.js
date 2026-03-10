import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import CheckoutSession from '../models/CheckoutSession.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

router.post('/create-checkout-session', async (req, res) => {
	console.log(`${CLIENT_URL}/claim-success?session_id={CHECKOUT_SESSION_ID}`);

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			customer_creation: 'always',
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Become a Believer',
						},
						unit_amount: 1600,
					},
					quantity: 1,
				},
			],
			success_url: `${CLIENT_URL}/claim-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${CLIENT_URL}`,
		});

		await CheckoutSession.findOneAndUpdate(
			{ sessionId: session.id },
			{
				sessionId: session.id,
				paymentStatus: 'pending',
				formCompleted: false,
				isDuplicate: false,
			},
			{ upsert: true, new: true },
		);

		res.json({ url: session.url });
	} catch (error) {
		console.error('create-checkout-session error:', error);
		res.status(500).json({ error: 'Failed to create checkout session' });
	}
});

router.get('/session/:sessionId', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(
			req.params.sessionId,
		);

		const checkoutRecord = await CheckoutSession.findOne({
			sessionId: session.id,
		});

		res.json({
			id: session.id,
			status: session.status,
			payment_status: session.payment_status,
			customer_email:
				session.customer_details?.email || session.customer_email || '',
			amount_total: session.amount_total,
			currency: session.currency,
			isDuplicate: checkoutRecord?.isDuplicate || false,
		});
	} catch (error) {
		console.error('Session fetch error:', error.message);
		res.status(500).json({ error: 'Failed to retrieve session' });
	}
});

export default router;
