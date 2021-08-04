import React from 'react'

// electron
import { shell } from 'electron';

// icons
import { GiPickOfDestiny } from "react-icons/gi";
import { VscQuote } from "react-icons/vsc";

// style
import './sass/about.scss'

const About = () => {
    return (
        <div className='about-us'>
            <div className="head-container">
                <div className="text-container">
                    <VscQuote />
                    <div className="title-top">We Wrote Our Own Destiny</div>
                    <VscQuote style={{ transform: 'rotate(180deg)' }} />
                </div>
                <div className="line"></div>
                <div className="logo-base">
                    <span className="text-logo">00 TEAM</span>
                </div>
            </div>
            <div className="footer-container">
                <p className='about-us-text'>
                    00 Team is an Iranian, organized company that started its work in 2019. <br />
                    00 Team has several achievements on Fivem Scripts development and has worked mostly on Web Development.<br />
                    Our work is for example writing HUD, Score Board Menus, and so on.<br />
                    our customers were many popular Fivem Iranian servers like: "Phonixe rp","moonlight rp", "justice city",...<br />
                    You Can Also Learn More About Us <span className="link" onClick={e => shell.openExternal('https://00-team.github.io/')}>Here</span>
                </p>
            </div>
        </div>
    )
}

export default About
