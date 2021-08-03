import React, { useState, useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { loadTabs } from '../../redux/actions/dns-changer/dnsChanger'
import { AddDnsDatabase } from '../../redux/actions/dns-database/dnsDatabase'

// dns changer redux
import { LOAD_DNS_CHANGER } from '../../redux/reducers/dns-changer/types'

// Editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'
import DnsEditor from '../editor/DnsEditor'

// loader
import Loader from '../common/Loader'

// alerts
import { useAlert } from 'react-alert'

// style
import './sass/dns-changer.scss'

const DnsChanger = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const state = useSelector(state => state.DnsChanger)
    const alerts = useSelector(state => state.alerts)
    const [currentTab, setCurrentTab] = useState(null)

    useEffect(() => {
        dispatch(loadTabs())
    }, [dispatch])

    const TabChanger = (tabId) => {
        dispatch({ 
            type: LOAD_DNS_CHANGER,
            payload: state.tabs.map(item => item.id === tabId ? {...item, isSelected: true} : {...item, isSelected: false})
        })
    }

    useEffect(() => {
        if (alerts.info) alert.info(alerts.info);
        if (alerts.success) alert.success(alerts.success);
        if (alerts.error) alert.error(alerts.error);
    }, [alerts])


    const AddDns = (data) => {
        dispatch(AddDnsDatabase({ dnsName: 'No Name', dns1: data.dns1, dns2: data.dns2 }))
    }


    useEffect(() => {
        if (state.tabs.find(item => item.isSelected)) setCurrentTab(state.tabs.find(item => item.isSelected))
    }, [state])

    if (state.loading) return <Loader />

    return (
        <div className='dns-changer'>
            <Editor>
                <Tabs TabList={state.tabs} SetCurrentTab={TabChanger} />
                <div className='editor-content'>
                    {currentTab && 
                    <DnsEditor 
                        dns1={currentTab.dns1} 
                        dns2={currentTab.dns2} 
                        actionList={[
                            { label: 'Change DNS', onClick: d => console.log(d) },
                            { label: 'Reset DNS', onClick: d => console.log(d) },
                            { label: 'Save DNS', onClick: d => AddDns(d) },
                        ]} 
                    />}
                    <DnsDatabaseSide SetCurrentTab={setCurrentTab} currentTab={currentTab} />
                </div>
            </Editor>
        </div>
    )
}

export default DnsChanger


const DnsDatabaseSide = ({ SetCurrentTab, currentTab }) => {
    const state = useSelector(state => state.DnsDatabase)

    return (
        <div className='dns-database-side'>
            <ul className='dns-list'>
                {state.dnsList.map((item, index) => 
                    <li key={index} className='dns' onClick={() => SetCurrentTab({...currentTab, dns1: item.dns1, dns2: item.dns2})} >
                        <span>{item.tabName}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}