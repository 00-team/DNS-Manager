import React from 'react'
import { VscClose } from 'react-icons/vsc'

import { ipcRenderer } from 'electron'


import './sass/header.scss'

const Header = () => {

    const CloseWindow = () => {
        ipcRenderer.invoke('close-window').then(result => {
            console.log(result);
        })
    }

    return (
        <div className='titlebar-container'>
            <header className='titlebar'>
                <div className="drag-region">
                    <span className='title'>Dns Manager - Beta</span>
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
