import React from 'react'
import ReactDOM from 'react-dom';

import Header from './components/layouts/Header'
import NetAdapter from './components/layouts/NetAdapter'
import DnsChanger from './components/dns-changer/DnsChanger';
import SavedDns from './components/saved-dns/SavedDns';

// alerts
import { Provider as AlertProvider } from 'react-alert'
import AlertsTemp from './components/layouts/AlertsTemp';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';


// style
import './components/sass/base.scss'


const alertOptions = {
    position: 'top right',
    timeout: 7000,
    transition: 'fade',
    containerStyle: {
        top: '20px',
        zIndex: '100',
    }
}


const App = () => {
    return (
        <>
            <Header />
            
            <div className='content-container'>
                <NetAdapter />
                <DnsChanger />
                <SavedDns />
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
