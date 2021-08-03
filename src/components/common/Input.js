import React, { useEffect, useRef } from 'react'

// style
import './sass/input.scss'

const Input = ({ onChange, placeholder, defaultValue, customStyle }) => {
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue
        }
    }, [defaultValue, inputRef])

    return (
        <div className='input-container'>
            <input 
                ref={inputRef}
                style={customStyle}
                type="text" 
                className='input'
                placeholder={placeholder} 
                onChange={e => onChange(e.target.value)}
                defaultValue={defaultValue}
            />
        </div>
    )
}

Input.defaultProps = {
    onChange: () => {},
    placeholder: '',
    defaultValue: '',
    customStyle: {},
}

export default Input
