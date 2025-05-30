import { Facebook, Headphones, Instagram, Twitch, Youtube } from "lucide-react";
import "./Socials.css"; // External CSS file for styles
import Image from "next/image";

function Socials() {
	return (
		<ul className="socials-list">
			<li>
				<a
					className="social-link"
					href="https://www.youtube.com/@de0vr"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/icons/youtube.svg"
						alt="instagram icon"
						width={24}
						height={24}
						className="socials_icon"
					></Image>
				</a>
			</li>
			<li>
				<a
					className="social-link"
					href="https://www.facebook.com/profile.php?id=61574938030081"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/icons/facebook.svg"
						alt="instagram icon"
						width={24}
						height={24}
						className="socials_icon"
					></Image>
				</a>
			</li>{" "}
			<li>
				<a
					className="social-link"
					href="https://www.twitch.tv/philplaysbass1"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/icons/twitch.svg"
						alt="instagram icon"
						width={24}
						height={24}
						className="socials_icon"
					></Image>
				</a>
			</li>
			<li>
				<a
					className="social-link"
					href="https://www.instagram.com/philplaysbass1/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/icons/instagram.svg"
						alt="instagram icon"
						width={24}
						height={24}
						className="socials_icon"
					></Image>
				</a>
			</li>
		</ul>
	);
}

export default Socials;
