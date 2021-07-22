import React, { useEffect, useState } from 'react'

import { exec } from 'child_process'

import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

import './sass/net-adapter.scss'

const NetAdapter = () => {
    const [adapters, setAdapters] = useState([])

    useEffect(() => {
        exec('powershell "Get-NetAdapter | ConvertTo-Json -Compress"', (error, stdout, stderr) => {
            if (error) {
                console.log('Error! ', error);
                return;
            }
        
            const NetAdaptersData = JSON.parse(stdout);
            if (typeof NetAdaptersData === 'object') {
                setAdapters(NetAdaptersData.map((item, index) => {
                    return {
                        id: index,
                        adapterId: item.InterfaceIndex,
                        adapterName: item.Name,
                        selected: false,
                        status: item.Status,
                    }
                }))
            }
        })

    }, [])

    const ChaneSelected = (id) => {
        setAdapters(adapters.map(item => {
            item.selected = false
            if (item.id === id) {
                item.selected = true
            }

            return item
        }))
    }

    const LoadingFlag = <div className='loading-box' style={{ height: '88vh', width: '60%' }} >
        <PacmanLoader color='#FFF' loading={true} css={css`width:auto;height:auto;`} />
    </div>

    const AdaptersFlag = adapters.map(item => 
        <div key={item.id} className={'adapter' + (item.selected ? ' selected' : '')} onClick={() => ChaneSelected(item.id)}>
            <span className='name' id='name'>{item.adapterName}</span>
        </div>
    )

    return (
        <div className='net-adapters'>
            {adapters.length > 0 ? AdaptersFlag : LoadingFlag}
        </div>
    )
}

export default NetAdapter
