import { useMemo, useState, useEffect } from 'react';
import { apiFetch } from './utils/api';
import './App.css';

import BackgroundScene from './components/BackgroundScene';
import FAQCard from './pages/FAQ';
import Header from './components/Header';
import TabNav from './components/TabNav';
import LeaderBoard from './pages/Leaderboard';
import LoginButton from './components/LoginButton';
import LoginModal from './modal/LoginModal';
import EditProfileModal from './modal/EditProfileModal';

const tabs = [
	{ id: 'leaderboard', label: 'Leaderboard' },
	{ id: 'faq', label: 'FAQs' },
];

export default function App() {
	const [believers, setBelievers] = useState([]);
	const [user, setUser] = useState(null);
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const [activeTab, setActiveTab] = useState('leaderboard');
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

	const rootClassName = useMemo(
		() => `neu-page ${darkMode ? 'dark' : ''}`,
		[darkMode],
	);

	const believerNumber = believers.length + 1;

	return (
		<div className={rootClassName}>
			<BackgroundScene />

			<div className="top-bar">
				<LoginButton
					user={user}
					onEdit={() => setIsEditProfileOpen(true)}
					onLoginClick={() => setLoginOpen(true)}
					onLogout={handleLogout}
				/>
			</div>

			<Header
				believerNumber={believerNumber}
				handleBeliever={handleBecomeBeliever}
				loadingCheckout={loadingCheckout}
			/>

			<main id="main-content" className="neu-main">
				<TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
				{activeTab === 'leaderboard' && <LeaderBoard believers={believers} />}
				{activeTab === 'faq' && <FAQCard />}
			</main>

			{isEditProfileOpen && (
				<EditProfileModal onClose={() => setIsEditProfileOpen(false)} />
			)}
			<LoginModal
				isOpen={loginOpen}
				onClose={() => setLoginOpen(false)}
				onLoggedIn={(believer) => setUser(believer)}
			/>
		</div>
	);
}
