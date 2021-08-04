import React, { useState, useEffect } from 'react'

// commons
import Button from '../common/Button'
import DnsInput from '../common/DnsInput'

// style
import './sass/dns-editor.scss'

const DnsEditor = ({ dns1, dns2, actionList, UpLayer }) => {
    const [currentDNS, setCurrentDNS] = useState({dns1: '', dns2: ''})
    const [initDNS, setInitDNS] = useState({dns1: '', dns2: ''})

    useEffect(() => {
        setCurrentDNS({dns1: dns1, dns2: dns2})
        setInitDNS({dns1: dns1, dns2: dns2})
    }, [dns1, dns2])
    
    return (
        <div className='dns-editor'>
            {UpLayer}
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
                {actionList.map((item, index) => <Button key={index} onClick={() => item.onClick(currentDNS)} > {item.label} </Button>)}
            </div>
        </div>
    )
}

DnsEditor.defaultProps = {
    dns1: '',
    dns2: '',
    actionList: [],
    customStyle: {},
    UpLayer: null,
}

export default DnsEditor