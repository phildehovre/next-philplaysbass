import React from "react";
import "./lessons.css";

const Lessons = () => {
	return (
		<section className="session-section">
			<div className="session-container">
				<h2 className="session-title">Choose Your Session</h2>

				<div className="session-cards">
					<div className="session-card">
						<h3 className="session-card-title">Intro Session</h3>
						<p className="session-card-description">
							A friendly, no-pressure introduction lasting 20 to 30 minutes.
							Perfect if you're just getting started or want to see if it's the
							right fit.
						</p>
						<a
							href="https://calendly.com/philplaysbass/30min?back=1&month=2025-05"
							target="_blank"
							rel="noopener noreferrer"
							className="session-button"
						>
							Book Now
						</a>
					</div>

					<div className="session-card">
						<h3 className="session-card-title">Full Session</h3>
						<p className="session-card-description">
							A full 1-hour session for in-depth work, learning, or practice.
							Ideal if you're ready to go further.
						</p>
						<a
							href="https://calendly.com/philplaysbass/1-hour-lesson?back=1&month=2025-05"
							target="_blank"
							rel="noopener noreferrer"
							className="session-button"
						>
							Book Now
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Lessons;
