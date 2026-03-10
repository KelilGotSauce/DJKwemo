import { formatLocation } from '../utils/locationFormatter';
import { formatDate } from '../utils/dateFormatter';

const socialIconMap = {
	twitter: {
		src: 'twitter.png',
		className: 'leaderboard-twitter',
		alt: 'Twitter',
	},
	x: {
		src: 'twitter.png',
		className: 'leaderboard-twitter',
		alt: 'X',
	},
	instagram: {
		src: 'instagram.png',
		className: 'leaderboard-instagram',
		alt: 'Instagram',
	},
	youtube: {
		src: 'youtube.png',
		className: 'leaderboard-youtube',
		alt: 'YouTube',
	},
	tiktok: {
		src: 'tiktok.png',
		className: 'leaderboard-tiktok',
		alt: 'TikTok',
	},
};

export default function LeaderBoard({ believers }) {
	return (
		<nav className="leaderboard-tab-nav">
			<div className="leaderboard-tab-list">
				<div className="leaderboard-row leaderboard-header">
					<span>Rank</span>
					<span>Name</span>
					<span>Location</span>
					<span>Journey</span>
					<span>Date</span>
					<span>Score</span>
				</div>

				{believers?.map((believer) => (
					<div key={believer.rank} className="leaderboard-row neu-tab-btn">
						<span>{believer.rank}</span>

						<span className="leaderboard-name">
							{believer.name} &nbsp;
							{believer.socialLinks?.map((socialLink, index) => {
								const icon = socialIconMap[socialLink.platform];

								if (!icon) return null;

								return (
									<a
										key={`${believer.rank}-${socialLink.platform}-${index}`}
										href={socialLink.url}
										target="_blank"
										rel="noopener noreferrer">
										<img
											className={icon.className}
											src={icon.src}
											alt={icon.alt}
										/>
									</a>
								);
							})}
						</span>

						<span>{formatLocation(believer.city, believer.country)}</span>
						<span>{believer.journey}</span>
						<span>{formatDate(believer.createdAt)}</span>
						<span style={{ color: '#beac46' }}>{believer.score}</span>
					</div>
				))}
			</div>
		</nav>
	);
}
