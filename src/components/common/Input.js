import React, { useState } from 'react'

import './sass/input.scss'

const Input = ({ type, defaultValue, onChange }) => {
    // 178.202.122.100
    const [inputStatus, setInputStatus] = useState('normal')
    const [isInputFocus, setIsInputFocus] = useState(false)
    const IPv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    const CheckIpAddr = (ip) => {
        if (typeof onChange === 'function') onChange(ip)

        if (ip === '') return setInputStatus('normal');

        if (IPv4Regex.test(ip)) {
            setInputStatus('good')
        } else {
            setInputStatus('bad')
        }
    }

    const IpInput = 
    <div className='input-container'>
        <input type='text' className='input' placeholder='Enter IP Adderss' 
            defaultValue={defaultValue}
            pattern="xxx.xxx.xxx.xxx" 
            maxLength='15' onChange={e => CheckIpAddr(e.target.value)} 
            onFocus={e => setIsInputFocus(true)}
            onBlur={e => setIsInputFocus(false)}

            style={ !isInputFocus ? (
                inputStatus === 'bad' ? { borderColor: '#E20338' } : (
                    inputStatus === 'good' ? { borderColor: '#00DC7D' } : {}
                )) : {}
            }
        />
        <span className='focus-border' ></span>
    </div>

    if (type === 'ipv4') return IpInput

    return (
        <></>
    )
}

Input.defaultProps = {
    type: '',
    defaultValue: '',
    onChange: () => {},
}

export default Input
