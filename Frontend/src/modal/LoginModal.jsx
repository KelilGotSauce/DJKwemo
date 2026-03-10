import { useState } from 'react';
import { apiFetch } from '../utils/api';

export default function LoginModal({ isOpen, onClose, onLoggedIn }) {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	if (!isOpen) return null;

	const requestCode = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			await apiFetch('/api/auth/request-code', {
				method: 'POST',
				body: JSON.stringify({ email }),
			});

			setMessage('Code sent. Check your email.');
			setStep(2);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const verifyCode = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			const data = await apiFetch('/api/auth/verify-code', {
				method: 'POST',
				body: JSON.stringify({ email, code }),
			});

			onLoggedIn(data.believer);
			onClose();
			setStep(1);
			setEmail('');
			setCode('');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<button onClick={onClose} style={{ float: 'right' }}>
					X
				</button>
				<h2>Believer Login</h2>

				{step === 1 && (
					<form onSubmit={requestCode}>
						<input
							type="email"
							placeholder="Enter the email you used to become a believer"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							style={inputStyle}
						/>
						<button type="submit" disabled={loading}>
							{loading ? 'Sending...' : 'Send Login Code'}
						</button>
					</form>
				)}

				{step === 2 && (
					<form onSubmit={verifyCode}>
						<input
							type="text"
							placeholder="Enter 6-digit code"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							required
							style={inputStyle}
						/>
						<button type="submit" disabled={loading}>
							{loading ? 'Verifying...' : 'Verify Code'}
						</button>
					</form>
				)}

				{message && <p>{message}</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</div>
		</div>
	);
}

const overlayStyle = {
	position: 'fixed',
	inset: 0,
	background: 'rgba(0,0,0,0.6)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const modalStyle = {
	background: 'white',
	padding: '24px',
	borderRadius: '12px',
	width: '100%',
	maxWidth: '420px',
};

const inputStyle = {
	width: '100%',
	padding: '12px',
	marginBottom: '12px',
};
