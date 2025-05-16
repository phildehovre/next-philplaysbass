"use client"

import VideoPlayer from "./VideoPlayer";
import './Hero.css';
import Socials from "./Socials";
import { textObject } from "../constants/textFile";
import { useLanguage } from "../context/LanguageContext";

const Hero: React.FC = () => {

    const {language} = useLanguage()

  return (
    <div className="hero_ctn">
      <VideoPlayer />
      <div className="slogan_ctn">
        <div className="left top"> 
          <h1 id='phil'>Phil</h1>
          <h1 id='bass'>BASS</h1>
          <h1 id='plays'>plays</h1>
        </div>
            <div className="right bottom">
            <div className="container">
            <div className="links_ctn">
                <ul>
                <li className="link_item">
                    <a href="">{textObject.nav.buttons.about.labels[language]}</a>
                </li>
                <li className="link_item">
                    <a href="">{textObject.nav.buttons.home.labels[language]}</a>
                </li>
                <li className="link_item">
                    <a href="">{textObject.nav.buttons.lessons.labels[language]}</a>
                </li>
                </ul>
              </div>
                <div className="buttons_ctn">
                    <button>Shop</button>
                    <button>Learn</button>
                </div>
                <Socials />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
