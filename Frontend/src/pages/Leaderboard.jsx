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
					<span className="col-rank">Rank</span>
					<span className="col-name">Name</span>
					<span className="col-location">Location</span>
					<span className="col-journey">Journey</span>
					<span className="col-date">Date</span>
					<span className="col-score">Score</span>
				</div>

				{believers?.map((believer) => (
					<div key={believer.rank} className="leaderboard-row neu-tab-btn">
						<span className="col-rank">{believer.rank}</span>

						<span className="leaderboard-name col-name">
							<span className="leaderboard-name-main">{believer.name}</span>

							<span className="leaderboard-name-icons">
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
						</span>

						<span className="col-location">
							{formatLocation(believer.city, believer.country)}
						</span>
						<span className="col-journey">{believer.journey}</span>
						<span className="col-date">{formatDate(believer.createdAt)}</span>
						<span className="col-score leaderboard-score">
							{believer.score}
						</span>
					</div>
				))}
			</div>
		</nav>
	);
}
