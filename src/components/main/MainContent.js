import React from 'react'

// get current page
import { useSelector } from 'react-redux'

// Pages
import DnsChanger from './DnsChanger'
import DnsDatabase from './DnsDatabase'
import Settings from './Settings'

const MainContent = () => {
    const currentPage = useSelector(state => state.sidebar.page)

    switch (currentPage) {
        case 'dns-changer':
            return <DnsChanger />
        case 'dns-database':
            return <DnsDatabase />
        case 'settings':
            return <Settings />

        default:
            return <></>
    }
}

export default MainContent
