import React, { useState, useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'

// dns changer redux
import { LOAD_DNS_CHANGER } from '../../redux/reducers/dns-changer/types'

// Editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'

import DnsInput from '../common/DnsInput'

// style
import './sass/dns-changer.scss'

const DnsChanger = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.DnsChanger)

    const TabChanger = (tabId) => {
        dispatch({ 
            type: LOAD_DNS_CHANGER,
            payload: state.tabs.map(item => {
                item.isSelected = false
                if (item.id === tabId) item.isSelected = true
                return item
            })
        })
    }

    return (
        <div className='dns-changer'>
            <Editor>
                <Tabs TabList={state.tabs} SetCurrentTab={TabChanger} />
                {/* <span>{state.tabs.find(item => item.isSelected).tabName}</span> */}
                <div className='editor-content'>
                    <DnsEditor />
                </div>
            </Editor>
        </div>
    )
}

export default DnsChanger


const DnsEditor = () => {
    const state = useSelector(state => state.DnsChanger.tabs)
    const [currentTab, setCurrentTab] = useState(null)
    const [currentDNS, setCurrentDNS] = useState({dns1: '', dns2: ''})

    useEffect(() => {
        if (state.find(item => item.isSelected)) {
            setCurrentTab(state.find(item => item.isSelected))
        }
    }, [state])

    useEffect(() => {
        if (currentTab) setCurrentDNS({dns1: currentTab.dns1, dns2: currentTab.dns2})
    }, [currentTab])

    
    if (!currentTab) return <></>
    
    return (
        <div className='dns-editor'>
            <div className='dns'>
                <span>DNS 1</span>
                <DnsInput customStyle={{ margin: '10px 0 0 20px' }} defaultValue={currentDNS.dns1} />
            </div>

            <div className='dns'>
                <span>DNS 2</span>
                <DnsInput customStyle={{ margin: '10px 0 0 20px' }} defaultValue={currentDNS.dns2} />
            </div>
        </div>
    )
}

DnsEditor.defaultProps = {

}