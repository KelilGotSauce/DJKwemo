import { useEffect, useMemo, useState } from 'react';
import { User, Flag, Globe, Building2 } from 'lucide-react';
import { apiFetch } from './api';
import SearchableSelect from './components/SearchableSelect';
import './neuromorphic/styles/editprofile.css';

const socialIconMap = {
	twitter: {
		src: 'twitter.png',
		alt: 'Twitter',
		style: {
			width: '16px',
			height: '16px',
			objectFit: 'contain',
		},
	},
	instagram: {
		src: 'instagram.png',
		alt: 'Instagram',
		style: {
			width: '18px',
			height: '18px',
			objectFit: 'contain',
		},
	},
	youtube: {
		src: 'youtube.png',
		alt: 'YouTube',
		style: {
			width: '20px',
			height: '20px',
			objectFit: 'contain',
		},
	},
};

export default function ClaimSuccess() {
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
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');

	const sessionId = new URLSearchParams(window.location.search).get(
		'session_id',
	);

	useEffect(() => {
		loadCountries();
	}, []);

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
			setError('');
			const data = await apiFetch('/api/locations/countries');
			setCountries(data.countries || []);
		} catch (err) {
			console.error('Failed to load countries:', err.message);
			setCountries([]);
			setError('Could not load countries right now.');
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!form.name.trim()) {
			setError('Name is required.');
			return;
		}

		try {
			setSubmitting(true);

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
				sessionId,
				name: form.name.trim(),
				country: form.country.trim(),
				city: form.city.trim(),
				socialLinks,
			};

			await apiFetch('/api/leaderboard/claim', {
				method: 'POST',
				body: JSON.stringify(payload),
			});

			window.location.href = '/';
		} catch (err) {
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const isSubmitDisabled = submitting || !form.name.trim();

	return (
		<main className="edit-profile-page">
			<article className="neu-card glass-panel faq-card edit-profile-card">
				<h1 className="neu-card-title edit-profile-title">CREATE USER</h1>

				<form
					onSubmit={handleSubmit}
					className="edit-profile-form"
					autoComplete="off">
					<div className="accordion-list edit-profile-list">
						<input
							type="text"
							name="fake-user"
							autoComplete="username"
							style={{ display: 'none' }}
						/>
						<InputRow
							autoComplete="off"
							icon={<User size={18} />}
							placeholder="Name *"
							name="believer-name"
							value={form.name}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, name: e.target.value }))
							}
							required
						/>

						<SelectRow
							autoComplete="off"
							icon={<Globe size={18} />}
							placeholder={
								loadingCountries ? 'Loading countries...' : 'Country (optional)'
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

						<SelectRow
							autoComplete="off"
							icon={<Building2 size={18} />}
							placeholder={
								!form.country ? 'City (optional)'
								: loadingCities ?
									'Loading cities...'
								:	'City (optional)'
							}
							options={cities}
							value={form.city}
							onChange={(value) =>
								setForm((prev) => ({
									...prev,
									city: value,
								}))
							}
							disabled={loadingCities}
							getOptionLabel={(option) =>
								typeof option === 'string' ? option : option?.name || ''
							}
							getOptionValue={(option) =>
								typeof option === 'string' ? option : option?.name || ''
							}
							renderOption={(option) => {
								const label =
									typeof option === 'string' ? option : option?.name || '';
								return (
									<div className="country-option-row">
										<span>{label}</span>
									</div>
								);
							}}
						/>

						<SocialInputRow
							autoComplete="off"
							socialKey="twitter"
							placeholder="Link (optional)"
							value={form.twitter}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, twitter: e.target.value }))
							}
						/>

						<SocialInputRow
							autoComplete="off"
							socialKey="instagram"
							placeholder="Link (optional)"
							value={form.instagram}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, instagram: e.target.value }))
							}
						/>

						<SocialInputRow
							autoComplete="off"
							socialKey="youtube"
							placeholder="Link (optional)"
							value={form.youtube}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, youtube: e.target.value }))
							}
						/>
					</div>

					<button
						type="submit"
						className="edit-profile-save-btn neu-focus"
						disabled={isSubmitDisabled}>
						<span>{submitting ? 'Loading...' : 'Become a Believer'}</span>
					</button>
				</form>

				{error && <p className="edit-profile-error">{error}</p>}
			</article>
		</main>
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

function SelectRow({
	icon,
	placeholder,
	options,
	value,
	onChange,
	getOptionLabel,
	getOptionValue,
	disabled,
	selectedIcon = null,
	renderOption,
}) {
	return (
		<div className="accordion-item neu-flat profile-row">
			<div className="profile-field-shell">
				<div className="profile-field-icon">{icon}</div>
				<div className="profile-field-control">
					<SearchableSelect
						label=""
						placeholder={placeholder}
						options={options}
						value={value}
						onChange={onChange}
						getOptionLabel={getOptionLabel}
						getOptionValue={getOptionValue}
						disabled={disabled}
						selectedIcon={selectedIcon}
						renderOption={renderOption}
					/>
				</div>
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
