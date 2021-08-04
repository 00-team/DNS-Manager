import React, { useState, useEffect } from 'react'

// icons
import { GrGroup } from "react-icons/gr";
import { TiGroupOutline } from "react-icons/ti";
import { VscClose, VscChromeMinimize } from 'react-icons/vsc'
import { GiPickOfDestiny } from "react-icons/gi";

// editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_SETTINGS_TAB } from '../../redux/reducers/settings/types'

// electron
import { shell } from 'electron';

// style
import './sass/settings.scss'

const Settings = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.Settings)
    const [currentTab, setCurrentTab] = useState(null)

    useEffect(() => {
        if (state.tabs) if (state.tabs.find(item => item.isSelected)) setCurrentTab(state.tabs.find(item => item.isSelected))
    }, [state])

    const TabChanger = (tabId) => {
        dispatch({ 
            type: CHANGE_SETTINGS_TAB,
            payload: state.tabs.map(item => item.id === tabId ? {...item, isSelected: true} : {...item, isSelected: false})
        })
    }

    return (
        <div className='settings'>
            <Editor>
                <Tabs TabList={state.tabs} SetCurrentTab={TabChanger} />
                <div className='editor-content'>
                    {currentTab && (currentTab.id === 1 ? <SettingsContent/> : <AboutUs />)}
                </div>
            </Editor>
        </div>
    )
}

export default Settings

const SettingsContent = () => {
    return (
        <div className='settings-content'>
            <span>Nothing for Now</span>
        </div>
    )
}


const AboutUs = () => {
    return (
        <div className='about-us'>
            <div className="head-container">
                <div className="text-container"><GiPickOfDestiny/> <div className="title-top">We Wrote Our Own Destiny </div>  <GiPickOfDestiny/></div>
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
                    You Can Also Learn More About Us <div className="link" onClick={e => shell.openExternal('https://00-team.github.io/')}>Here</div>
                </p>
            </div>
        </div>
    )
}
