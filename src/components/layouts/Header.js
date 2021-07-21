import React from 'react'
import { VscClose } from 'react-icons/vsc'

const win = window.require('electron').remote.getCurrentWindow();

import './sass/header.scss'

const Header = () => {

    const CloseWindow = () => {
        win.removeAllListeners();
        win.close()
    }

    return (
        <div className='titlebar-container'>
            <header className='titlebar'>
                <div className="drag-region">
                    <span className='title'>Dns Manager</span>
                    <div className="controls">
                        <div className='btn close' id='close-window' onClick={() => CloseWindow()}>
                            <VscClose />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
