import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';

// layouts
import Header from './components/layouts/Header'
import SideBar from './components/layouts/SideBar';

// alerts
import { Provider as AlertProvider } from 'react-alert'
import AlertsTemp from './components/layouts/AlertsTemp';

// redux
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import store from './redux/store';
import { LoadDatabase } from './redux/actions/dns-database/dnsDatabase';


// style
import './components/sass/base.scss'

// Main Control section
import MainContent from './components/main/MainContent';

// OpenDNS: 208.67.222.222 and 208.67.220.220;
// Cloudflare 1.1.1.1 and 1.0.0.1;
// Google: 8.8.8.8 and 8.8.4.4;
// Quad9: 9.9.9.9 and 149.112.112.112.

const alertOptions = {
    position: 'top right',
    timeout: 5000,
    transition: 'fade',
    containerStyle: {
        top: '20px',
        zIndex: '100',
    }
}


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoadDatabase())
    }, [dispatch])

    return (
        <>
            <Header />
            <SideBar />
            
            <div className='content-container'>
                <MainContent />
            </div>
        </>
    )
}

export default App


ReactDOM.render(
    <ReduxProvider store={store}>
        <AlertProvider template={AlertsTemp} {...alertOptions} >
            <App />
        </AlertProvider>
    </ReduxProvider>, 
    document.getElementById('root')
)
