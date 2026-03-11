import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import CheckoutSession from '../models/CheckoutSession.js';
import Leaderboard from '../models/Leaderboard.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', express.raw({ type: '*/*' }), async (req, res) => {
	console.log('We made it inside the Webhook');
	console.log('Body is buffer:', Buffer.isBuffer(req.body));
	const sig = req.headers['stripe-signature'];
	console.log(sig);
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		console.error('Webhook signature verification failed:', err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;

		const email = (
			session.customer_details?.email ||
			session.customer_email ||
			''
		)
			.toLowerCase()
			.trim();

		if (!email) {
			console.error(
				'No email found on completed checkout session:',
				session.id,
			);
			return res.json({ received: true });
		}

		try {
			const existingBeliever = await Leaderboard.findOne({ email });

			await CheckoutSession.findOneAndUpdate(
				{ sessionId: session.id },
				{
					sessionId: session.id,
					email,
					paymentStatus: 'paid',
					formCompleted: false,
					isDuplicate: !!existingBeliever,
				},
				{ upsert: true, new: true },
			);

			if (existingBeliever) {
				console.log(`Duplicate believer payment detected for ${email}`);
			} else {
				console.log(`Payment confirmed for new believer ${email}`);
			}
		} catch (error) {
			console.error('Database error in webhook:', error.message);
			return res.status(500).json({ error: 'Database error' });
		}
	}

	res.json({ received: true });
});

export default router;
