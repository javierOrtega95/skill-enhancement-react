import { useState } from "react";

export function TwitterFollowCard({
	formatUserName,
	username,
	name,
	initialIsFollowing = false,
}) {
	const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

	const imgSrc = `https://unavatar.io/${username}`;

	const text = isFollowing ? "Following" : "Follow";

	const buttonClassName = isFollowing
		? "tw-followCard-button is-following"
		: "tw-followCard-button";

	const handleClick = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<article className="tw-followCard">
			<header className="tw-followCard-header">
				<img className="tw-followCard-avatar" src={imgSrc} alt="Avatar" />
				<div className="tw-followCard-info">
					<strong>{name}</strong>
					<span className="tw-followCard-username">
						{formatUserName(username)}
					</span>
				</div>
			</header>

			<aside>
				<button className={buttonClassName} onClick={handleClick}>
					<span className="tw-followCard-text">{text}</span>
					<span className="tw-followCard-stopFollow">Unfollow</span>
				</button>
			</aside>
		</article>
	);
}
