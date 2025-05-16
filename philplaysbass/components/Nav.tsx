"use client"
import './Nav.css'
import {textObject as lg} from '../constants/textFile'
import { useLanguage } from '../context/LanguageContext'
import {LANGUAGES} from '../constants/languages'
import type { LanguagesType } from '../types/types'

const Nav = () => {

    const {language, setLanguage} = useLanguage()

    const languages: LanguagesType[] = LANGUAGES
    const btns = lg.nav.buttons

    const renderLanguageButtons = ( ) => {

       return languages.map(i => {
        return (
        <button style={{textTransform: "uppercase"}} onClick={() => setLanguage(i)}>{i}</button>
        )
       })
    }

    return (
        <nav>
            <div className="logo">Logo</div>
            <ul>
                <li><a href="/" title={btns.home.tooltip[language]}>{btns.home.labels[language]}</a></li>
                <li><a href="/about" title={btns.about.tooltip[language]}>{btns.about.labels[language]}</a></li>
                <li><a href="/lessons" title={btns.lessons.tooltip[language]}>{btns.lessons.labels[language]}</a></li>
            </ul>
            <div className="languages">
                {renderLanguageButtons()}
            </div>
        </nav>
    )

}

export default Nav