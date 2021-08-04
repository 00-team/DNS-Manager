import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// style
import './sass/dns-input.scss'

const IPv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const DnsInput = ({ onChange, placeholder, defaultValue, customStyle }) => {
    const [style, setStyle] = useState({})
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue
            setStyle({...style, borderColor: ''})
            inputRef.current.style.borderColor =  ''
        }
    }, [defaultValue, inputRef])
    
    useEffect(() => {
        setStyle({...style, ...customStyle})
    }, [customStyle])

    const CheckIpAddr = (ip) => {
        if (typeof onChange === 'function') onChange(ip)

        if (ip === '' || ip === defaultValue) {
            setStyle({
                ...style,
                borderColor: '',
            })
        } else {
            if (IPv4Regex.test(ip)) {
                setStyle({
                    ...style,
                    borderColor: '#00DC7D',
                })
            } else {
                setStyle({
                    ...style,
                    borderColor: '#E20338',
                })
            }
        }
    }

    return (
        <div className='dns-input-container'>
            <input 
                ref={inputRef}
                style={style}
                type="text" 
                className='dns-input'
                placeholder={placeholder} 
                onChange={e => CheckIpAddr(e.target.value)}
                defaultValue={defaultValue}
                maxLength='15'
            />
        </div>
    )
}

DnsInput.defaultProps = {
    onChange: () => {},
    placeholder: 'Enter DNS',
    defaultValue: '',
    customStyle: {},
}

DnsInput.propTypes = {
    customStyle: PropTypes.object
}


export default DnsInput
