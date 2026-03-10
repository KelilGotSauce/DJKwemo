import { useEffect, useState } from 'react';
import LoginModal from './modal/LoginModal';
import { apiFetch } from './api';
import App2 from './neuromorphic/App2';
import Navbar from './components/navbar';
import './App.css';

export default function App() {
	const [believers, setBelievers] = useState([]);
	const [user, setUser] = useState(null);
	const [loginOpen, setLoginOpen] = useState(false);
	const [loadingCheckout, setLoadingCheckout] = useState(false);

	useEffect(() => {
		fetchLeaderboard();
		fetchMe();
	}, []);

	const fetchLeaderboard = async () => {
		try {
			const data = await apiFetch('/api/leaderboard');
			setBelievers(data);
		} catch (error) {
			console.error('Leaderboard error:', error.message);
		}
	};

	const fetchMe = async () => {
		try {
			const data = await apiFetch('/api/auth/me');
			setUser(data.believer || null);
		} catch {
			setUser(null);
		}
	};

	const handleLogout = async () => {
		try {
			await apiFetch('/api/auth/logout', {
				method: 'POST',
			});
			setUser(null);
		} catch (error) {
			console.error('Logout error:', error.message);
		}
	};

	const handleBecomeBeliever = async () => {
		try {
			setLoadingCheckout(true);

			const data = await apiFetch('/api/stripe/create-checkout-session', {
				method: 'POST',
			});

			window.location.href = data.url;
		} catch (error) {
			console.error('Checkout error:', error.message);
			alert(error.message);
		} finally {
			setLoadingCheckout(false);
		}
	};

	const nextBelieverNumber = believers.length + 1;

	const formatLocation = (believer) => {
		return [believer.city, believer.country].filter(Boolean).join(', ');
	};

	const showNeuromorphicPlayground = true;

	return showNeuromorphicPlayground ?
			<App2 />
		:	<>
				<Navbar
					user={user}
					onLoginClick={() => setLoginOpen(true)}
					onLogout={handleLogout}
				/>

				<main style={{ padding: '32px' }}>
					{!user ?
						<>
							<h1 className="headline">
								Prove You Believed In Me Before I Blew Up
							</h1>
							<button onClick={handleBecomeBeliever} disabled={loadingCheckout}>
								{loadingCheckout ?
									'Loading...'
								:	`Become Believer #${nextBelieverNumber}`}
							</button>
						</>
					:	<>
							<h1>Congratulations, You Were The #{user.rank} Believer</h1>
							<button onClick={() => (window.location.href = '/edit-profile')}>
								Edit Believer Profile
							</button>
						</>
					}

					<section style={{ marginTop: '40px' }}>
						<h2>Leaderboard</h2>

						{believers.map((believer) => {
							const locationText = formatLocation(believer);

							return (
								<div
									key={believer._id}
									style={{
										border: '1px solid #ddd',
										padding: '12px',
										marginBottom: '8px',
										borderRadius: '8px',
									}}>
									<strong>#{believer.rank}</strong> — {believer.name}
									{believer.social ? ` — ${believer.social}` : ''}
									{locationText ? ` — ${locationText}` : ''}
								</div>
							);
						})}
					</section>
				</main>

				<LoginModal
					isOpen={loginOpen}
					onClose={() => setLoginOpen(false)}
					onLoggedIn={(believer) => setUser(believer)}
				/>
			</>;
}
