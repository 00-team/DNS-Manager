import React, { useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'

// dns changer redux
import { LOAD_DNS_CHANGER } from '../../redux/reducers/dns-changer/types'

// Editor
import Editor from '../editor/Editor'
import Tabs from '../editor/Tabs'


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
    return (
        <div className='dns-editor'>

        </div>
    )
}

DnsEditor.defaultProps = {

}