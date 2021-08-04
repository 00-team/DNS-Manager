import React, { useState, useEffect } from 'react'

// editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_SETTINGS_TAB } from '../../redux/reducers/settings/types'

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
                    <SettingsContent/>
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
