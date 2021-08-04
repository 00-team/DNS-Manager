import React from 'react'

// style
import './sass/button.scss'

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className='custom-button'
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    children: '',
    onClick: () => {}
}

export default Button
