import React from 'react'

import './sass/header.scss'

const Header = () => {
    return (
        <div className='titlebar-container'>
            <header className='titlebar'>
                <div className="drag-region"></div>
            </header>
        </div>
    )
}

export default Header
