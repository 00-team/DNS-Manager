import React, { useState, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_DNS_DATABASE } from '../../redux/reducers/dns-database/types'

// editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'
import DnsEditor from '../editor/DnsEditor'

// style

import './sass/dns-database.scss'

const DnsDatabase = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.DnsDatabase)
    const [currentTab, setCurrentTab] = useState(null)

    const TabChanger = (tabId) => {
        dispatch({ 
            type: LOAD_DNS_DATABASE,
            payload: state.dnsList.map(item => item.id === tabId ? {...item, isSelected: true} : {...item, isSelected: false})
        })
    }

    useEffect(() => {
        if (state.dnsList) if (state.dnsList.find(item => item.isSelected)) setCurrentTab(state.dnsList.find(item => item.isSelected))
    }, [state])

    return (
        <div className='dns-database'>
            <Editor>
                <Tabs TabList={state.dnsList} SetCurrentTab={TabChanger} />
                <div className='editor-content'>
                    {currentTab && 
                    <DnsEditor 
                        dns1={currentTab.dns1} 
                        dns2={currentTab.dns2}
                        actionList={[
                            { label: 'Save', onClick: data => console.log(data) },
                            { label: 'Delete', onClick: data => console.log(data) },
                        ]}
                    />}
                </div>
            </Editor>
        </div>
    )
}

export default DnsDatabase
