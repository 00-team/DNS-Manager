import React, { useState, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_DNS_DATABASE } from '../../redux/reducers/dns-database/types'
import { LoadDatabase } from '../../redux/actions/dns-database/dnsDatabase'

// editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'
import DnsEditor from '../editor/DnsEditor'

// loader
import Loader from '../common/Loader'

// common
import Input from '../common/Input'

// style
import './sass/dns-database.scss'

const DnsDatabase = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.DnsDatabase)
    const [currentTab, setCurrentTab] = useState(null)

    useEffect(() => {
        dispatch(LoadDatabase())
    }, [dispatch])

    const TabChanger = (tabId) => {
        dispatch({ 
            type: LOAD_DNS_DATABASE,
            payload: state.dnsList.map(item => item.id === tabId ? {...item, isSelected: true} : {...item, isSelected: false})
        })
    }

    useEffect(() => {
        if (state.dnsList) if (state.dnsList.find(item => item.isSelected)) setCurrentTab(state.dnsList.find(item => item.isSelected))
    }, [state])

    if (state.loading) return <Loader />

    return (
        <div className='dns-database'>
            <Editor>
                <Tabs TabList={state.dnsList} SetCurrentTab={TabChanger} />
                <div className='editor-content'>
                    {currentTab && 
                    <DnsEditor 
                        UpLayer={
                        <div className='dns'>
                            <span>DNS Name</span>
                            <Input 
                                onChange={v => console.log(v)} 
                                customStyle={{ margin: '10px 0 0 20px' }} 
                                defaultValue={currentTab.tabName}
                                placeholder='Enter Dns Name'
                            />
                        </div>
                        }
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
