import React, { useState, useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'

// dns changer redux
import { LOAD_DNS_CHANGER } from '../../redux/reducers/dns-changer/types'

// Editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'

// common elements
import DnsInput from '../common/DnsInput'
import Button from '../common/Button'

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
                <div className='editor-content'>
                    <DnsEditor currentTab={state.tabs.find(item => item.isSelected) || null} />
                </div>
            </Editor>
        </div>
    )
}

export default DnsChanger


const DnsEditor = ({ currentTab }) => {
    const [currentDNS, setCurrentDNS] = useState({dns1: '', dns2: ''})
    const [initDNS, setInitDNS] = useState({dns1: '', dns2: ''})

    useEffect(() => {
        if (currentTab) setCurrentDNS({dns1: currentTab.dns1, dns2: currentTab.dns2})
        if (currentTab) setInitDNS({dns1: currentTab.dns1, dns2: currentTab.dns2})
    }, [currentTab])

    if (!currentTab) return <></>
    
    return (
        <div className='dns-editor-container'>
            <div className='dns-editor'>
                <div className='dns'>
                    <span>DNS 1</span>
                    <DnsInput 
                        customStyle={{ margin: '10px 0 0 20px' }} 
                        defaultValue={initDNS.dns1} 
                        onChange={value => setCurrentDNS({...currentDNS, dns1: value})} 
                    />
                </div>

                <div className='dns'>
                    <span>DNS 2</span>
                    <DnsInput 
                        customStyle={{ margin: '10px 0 0 20px' }} 
                        defaultValue={initDNS.dns2} 
                        onChange={value => setCurrentDNS({...currentDNS, dns2: value})} 
                    />
                </div>

                <div className='actions'>
                    <Button onClick={e => console.log(currentDNS)}>Change DNS</Button>
                    <Button>Reset DNS</Button>
                    <Button>Save DNS</Button>
                </div>
            </div>

            <DnsDatabaseSide />
        </div>
    )
}

const DnsDatabaseSide = () => {
    const state = useSelector(state => state.DnsDatabase)

    return (
        <div className='dns-database-side'>
            <ul className='dns-list'>
                {state.dnsList.map((item, index) => 
                    <li key={index} className='dns' onClick={() => console.log(item)} >
                        <span>{item.dnsName}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}