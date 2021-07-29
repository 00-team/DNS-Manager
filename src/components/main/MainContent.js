import React from 'react'

// get current page
import { useSelector } from 'react-redux'

// Pages
import DnsChanger from './DnsChanger'

const MainContent = () => {
    const currentPage = useSelector(state => state.sidebar.page)

    switch (currentPage) {
        case 'dns-changer':
            return <DnsChanger />
        case 'dns-database':
            return <span>dns database</span>
        case 'settings':
            return <span>settings</span>

        default:
            return <></>
    }
}

export default MainContent
