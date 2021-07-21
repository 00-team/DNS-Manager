import React, { useEffect, useState } from 'react'


const { exec } = window.require('child_process')


import './sass/saved-dns.scss'

const SavedDNS = () => {
    const [adapters, setAdapters] = useState([])

    useEffect(() => {
        exec('powershell "Get-NetAdapter | ConvertTo-Json"', (error, stdout, stderr) => {
            if (error) {
                console.log('Error! ', error);
                return;
            }
        
            const NetAdapters = JSON.parse(stdout);
            if (typeof NetAdapters === 'object') {
                setAdapters(NetAdapters.map(item => item.Name))
            }
        })

    }, [])

    return (
        <div className='saved-dns'>
            {adapters.map((item, index) => 
                <div key={index} className='dns'>
                    <span className='name' id='name'>{item}</span>
                </div>
            )}
            
        </div>
    )
}

export default SavedDNS
