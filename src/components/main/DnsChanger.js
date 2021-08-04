import React, { useState, useEffect } from 'react'

// axios
import axios from 'axios'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_DNS_CHANGER } from '../../redux/reducers/dns-changer/types'
import { loadTabs, ChangeDns } from '../../redux/actions/dns-changer/dnsChanger'
import { AddDnsDatabase } from '../../redux/actions/dns-database/dnsDatabase'

// chech dns
import ChechDns from '../../ChechDns'

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
        if (alerts.info) {alert.info(alerts.info); dispatch({ type: 'INFO_ALERT', payload: null });}
        if (alerts.error) {alert.error(alerts.error); dispatch({ type: 'ERROR_ALERT', payload: null });}
        if (alerts.success) {alert.success(alerts.success); dispatch({ type: 'SUCCESS_ALERT', payload: null });}
    }, [alerts])


    const AddDns = (data) => {
        if (!data || !data.dns1 || !data.dns2) return alert.error('You should fill dns fields')
        if (!ChechDns(data.dns1) || !ChechDns(data.dns2)) return alert.error('Your dns is not valid')

        axios.get(`http://ipwhois.app/json/${data.dns1}?objects=isp,success`).then(res => {
            let dnsName = 'No Name'
            if (res.data.success) {
                dnsName = res.data.isp
            } else {
                dnsName = 'Offline Dns'
            }

            dispatch(AddDnsDatabase({ dnsName: dnsName, dns1: data.dns1, dns2: data.dns2 }))

        }).catch(err => alert.error('Error to request the dns'))
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
                            { label: 'Change DNS', onClick: d => dispatch(ChangeDns({
                                id: currentTab.id,
                                action: 'change',
                                dns1: d.dns1,
                                dns2: d.dns2
                            })) },
                            { label: 'Reset DNS', onClick: d => dispatch(ChangeDns({
                                id: currentTab.id,
                                action: 'reset',
                            })) },
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