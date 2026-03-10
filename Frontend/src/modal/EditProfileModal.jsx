import { useEffect, useMemo, useState } from 'react';
import { User } from 'lucide-react';
import { apiFetch } from '../utils/api';
import SearchableSelect from '../components/SearchableSelect';
import '../styles/editprofile.css';

const socialIconMap = {
	twitter: {
		src: 'twitter.png',
		alt: 'Twitter',
		style: {
			width: '28px',
			objectFit: 'contain',
		},
	},
	instagram: {
		src: 'instagram.png',
		alt: 'Instagram',
		style: {
			width: '20px',
			objectFit: 'contain',
		},
	},
	youtube: {
		src: 'youtube.png',
		alt: 'YouTube',
		style: {
			width: '45px',
			objectFit: 'contain',
		},
	},
};

export default function EditProfileModal({ onClose }) {
	const [form, setForm] = useState({
		name: '',
		country: '',
		city: '',
		youtube: '',
		twitter: '',
		instagram: '',
	});

	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [loadingCountries, setLoadingCountries] = useState(true);
	const [loadingCities, setLoadingCities] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		loadCountries();
		loadUser();
	}, []);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEscape);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	}, [onClose]);

	useEffect(() => {
		if (form.country) {
			loadCities(form.country);
		} else {
			setCities([]);
			setForm((prev) => ({ ...prev, city: '' }));
		}
	}, [form.country]);

	const selectedCountry = useMemo(() => {
		return countries.find((item) => item.name === form.country) || null;
	}, [countries, form.country]);

	const loadCountries = async () => {
		try {
			setLoadingCountries(true);
			const data = await apiFetch('/api/locations/countries');
			setCountries(data.countries || []);
		} catch (err) {
			console.error('Failed to load countries:', err.message);
		} finally {
			setLoadingCountries(false);
		}
	};

	const loadCities = async (country) => {
		try {
			setLoadingCities(true);
			const data = await apiFetch(
				`/api/locations/cities?country=${encodeURIComponent(country)}`,
			);
			setCities(data.cities || []);
		} catch (err) {
			console.error('Failed to load cities:', err.message);
			setCities([]);
		} finally {
			setLoadingCities(false);
		}
	};

	const loadUser = async () => {
		try {
			const data = await apiFetch('/api/auth/me');

			if (data.believer) {
				const socialLinks = data.believer.socialLinks || [];

				const getSocialValue = (platform) =>
					socialLinks.find((item) => item.platform === platform)?.url || '';

				setForm({
					name: data.believer.name || '',
					country: data.believer.country || '',
					city: data.believer.city || '',
					twitter: getSocialValue('twitter') || getSocialValue('x'),
					instagram: getSocialValue('instagram'),
					youtube: getSocialValue('youtube'),
				});
			}
		} catch (err) {
			setError('Please log in first.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const socialLinks = [
				form.twitter?.trim() ?
					{ platform: 'twitter', url: form.twitter.trim() }
				:	null,
				form.instagram?.trim() ?
					{ platform: 'instagram', url: form.instagram.trim() }
				:	null,
				form.youtube?.trim() ?
					{ platform: 'youtube', url: form.youtube.trim() }
				:	null,
			].filter(Boolean);

			const payload = {
				name: form.name.trim(),
				country: form.country.trim(),
				city: form.city.trim(),
				socialLinks,
			};

			await apiFetch('/api/leaderboard/me', {
				method: 'PATCH',
				body: JSON.stringify(payload),
			});

			onClose();
			window.location.reload();
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="edit-profile-modal-overlay" onClick={onClose}>
			<div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
				<article className="neu-card glass-panel faq-card edit-profile-card">
					<h1 className="neu-card-title edit-profile-title">EDIT PROFILE</h1>

					<form onSubmit={handleSubmit} className="edit-profile-form">
						<div className="accordion-list edit-profile-list">
							<InputRow
								icon={<User size={18} />}
								placeholder="Name"
								name="name"
								value={form.name}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, name: e.target.value }))
								}
								required
							/>

							<div className="accordion-item neu-flat profile-select-accordion">
								<div className="profile-select-inner">
									<div className="profile-field-control">
										<SearchableSelect
											label=""
											placeholder={
												loadingCountries ? 'Loading countries...' : 'Country'
											}
											options={countries}
											value={form.country}
											onChange={(value) =>
												setForm((prev) => ({
													...prev,
													country: value,
													city: '',
												}))
											}
											getOptionLabel={(option) => option.name}
											getOptionValue={(option) => option.name}
											disabled={loadingCountries}
											selectedIcon={
												selectedCountry?.flag ?
													<img
														src={selectedCountry.flag}
														alt={`${selectedCountry.name} flag`}
														width="20"
														height="14"
														style={{
															objectFit: 'cover',
															border: '1px solid rgba(255,255,255,0.12)',
															borderRadius: '4px',
														}}
													/>
												:	null
											}
											renderOption={(option) => (
												<div className="country-option-row">
													{option.flag && (
														<img
															src={option.flag}
															alt={`${option.name} flag`}
															width="20"
															height="14"
															style={{
																objectFit: 'cover',
																border: '1px solid rgba(255,255,255,0.12)',
																borderRadius: '4px',
															}}
														/>
													)}
													<span>{option.name}</span>
												</div>
											)}
										/>
									</div>
								</div>
							</div>

							<div className="accordion-item neu-flat profile-select-accordion">
								<div className="profile-select-inner">
									<div className="profile-field-control">
										<SearchableSelect
											label=""
											placeholder={
												!form.country ? 'Select a country first'
												: loadingCities ?
													'Loading cities...'
												:	'City'
											}
											options={cities}
											value={form.city}
											onChange={(value) =>
												setForm((prev) => ({
													...prev,
													city: value,
												}))
											}
											disabled={!form.country || loadingCities}
											getOptionLabel={(option) =>
												typeof option === 'string' ? option : option?.name || ''
											}
											getOptionValue={(option) =>
												typeof option === 'string' ? option : option?.name || ''
											}
											renderOption={(option) => {
												const label =
													typeof option === 'string' ? option : (
														option?.name || ''
													);
												return (
													<div className="country-option-row">
														<span>{label}</span>
													</div>
												);
											}}
										/>
									</div>
								</div>
							</div>

							<SocialInputRow
								socialKey="twitter"
								placeholder="Twitter / X link or @handle"
								value={form.twitter}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, twitter: e.target.value }))
								}
							/>

							<SocialInputRow
								socialKey="instagram"
								placeholder="Instagram link or @handle"
								value={form.instagram}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, instagram: e.target.value }))
								}
							/>

							<SocialInputRow
								socialKey="youtube"
								placeholder="YouTube link or @handle"
								value={form.youtube}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, youtube: e.target.value }))
								}
							/>
						</div>

						<button
							type="submit"
							className="edit-profile-save-btn neu-focus"
							disabled={!form.name || !form.country || !form.city}>
							<span>Save Changes</span>
						</button>
					</form>

					{error && <p className="edit-profile-error">{error}</p>}
				</article>
			</div>
		</div>
	);
}

function InputRow({
	icon,
	placeholder,
	name,
	value,
	onChange,
	required = false,
}) {
	return (
		<div className="accordion-item neu-flat profile-row">
			<div className="profile-field-shell">
				<div className="profile-field-icon">{icon}</div>
				<input
					className="profile-input"
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
				/>
			</div>
		</div>
	);
}

function SocialInputRow({ socialKey, placeholder, value, onChange }) {
	const icon = socialIconMap[socialKey];

	return (
		<div className="accordion-item neu-flat profile-row">
			<div className="profile-field-shell">
				<div className="profile-field-icon profile-field-icon-image">
					<img src={icon.src} alt={icon.alt} style={icon.style} />
				</div>
				<input
					className="profile-input"
					name={socialKey}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
