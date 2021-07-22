import React from 'react'

import './sass/button.scss'

const Button = ({ children, onClick }) => {
    return (
        <button className='custom-button' onClick={() => onClick()} > {children} </button>
    )
}

Button.defaultProps = {
    children: '',
    onClick: () => {}
}

export default Button
