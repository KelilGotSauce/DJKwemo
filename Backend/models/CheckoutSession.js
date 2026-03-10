import mongoose from 'mongoose';

const checkoutSessionSchema = new mongoose.Schema(
	{
		sessionId: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			default: '',
		},
		paymentStatus: {
			type: String,
			default: 'pending',
		},
		formCompleted: {
			type: Boolean,
			default: false,
		},
		isDuplicate: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('CheckoutSession', checkoutSessionSchema);
