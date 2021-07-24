import React from 'react'
import ReactDOM from 'react-dom';

import Header from './components/layouts/Header'
import NetAdapter from './components/layouts/NetAdapter'
import DnsChanger from './components/dns-changer/DnsChanger';
import SavedDns from './components/saved-dns/SavedDns';

import { shell } from 'electron'

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

                <div className='discord-00-team' onClick={() => shell.openExternal('https://discord.gg/nux2MBcjPD')}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 300.000000 300.000000">
                        <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="#FFF" stroke="none">
                            <path d="M923 4402 l-203 -219 1 -1066 0 -1067 210 -215 209 -215 564 0 565 0 
                                    204 215 205 215 1 1070 1 1070 -202 215 -202 215 -574 0 -575 0 -204 -218z
                                    m1303 -238 l114 -115 0 -920 0 -920 -117 -116 -117 -116 -406 0 -406 0 -107
                                    106 -107 106 0 928 0 927 105 117 105 116 411 2 410 1 115 -116z"
                            />
                            <path d="M1500 3125 l0 -245 200 0 200 0 0 245 0 245 -200 0 -200 0 0 -245z"/>
                            
                            <path d="M3523 4402 l-203 -218 0 -1064 0 -1064 205 -217 205 -218 570 0 570
                                    0 205 218 205 217 0 1067 -1 1067 -204 216 -205 216 -572 -1 -573 -1 -202
                                    -218z m1294 -233 l103 -111 1 -933 1 -933 -108 -108 -108 -107 -407 1 -407 1
                                    -107 106 -107 107 1 925 1 926 105 118 105 118 412 1 412 0 103 -111z"
                            />
                            <path d="M4100 3125 l0 -245 200 0 200 0 0 245 0 245 -200 0 -200 0 0 -245z"/>
                        </g>
                    </svg>
                </div>

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
