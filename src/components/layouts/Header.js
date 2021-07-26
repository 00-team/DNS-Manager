import React from 'react'
import { VscClose, VscChromeMinimize } from 'react-icons/vsc'

import { ipcRenderer } from 'electron'
import { useAlert } from 'react-alert'


import './sass/header.scss'

const Header = () => {
    const alert = useAlert()

    const WindowControl = (type) => {
        ipcRenderer.invoke('window-control', type)
        .then(res => {
            if (res.status === 'error') alert.error(res.message)
        })
    }



    return (
        <div className='titlebar-container'>
            <header className='titlebar'>
                <div className="drag-region">
                    <span className='title'>Dns Manager</span>
                    <div className="controls">

                        <div className='btn' onClick={() => WindowControl('minimize')}>
                            <VscChromeMinimize />
                        </div>

                        <div className='btn close' onClick={() => WindowControl('close')}>
                            <VscClose />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
