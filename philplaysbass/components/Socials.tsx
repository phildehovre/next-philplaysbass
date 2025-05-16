import { Facebook, Headphones, Instagram, Twitch, Youtube } from "lucide-react";
import "./Socials.css"; // External CSS file for styles


function Socials() {
  return (
    <ul className="socials-list">
      <li>
        <a
          className="social-link"
          href="https://www.youtube.com/watch?v=QlwlT6CPqJ8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="youtube-icon" /> 
        </a>
      </li>
      <li>
        <a
          className="social-link"
          href="https://www.facebook.com/seanjacksonband"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitch className="facebook-icon" /> 
        </a>
      </li>
      <li>
        <a
          className="social-link"
          href="https://www.instagram.com/seanjacksonband/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="instagram-icon" />
        </a>
      </li>
    </ul>
  );
}

export default Socials;
