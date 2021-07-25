import React from 'react'
import ReactDOM from 'react-dom';

// layouts
import Header from './components/layouts/Header'
import SideBar from './components/layouts/SideBar';

// alerts
import { Provider as AlertProvider } from 'react-alert'
import AlertsTemp from './components/layouts/AlertsTemp';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';


// style
import './components/sass/base.scss'


// OpenDNS: 208.67.222.222 and 208.67.220.220;
// Cloudflare 1.1.1.1 and 1.0.0.1;
// Google: 8.8.8.8 and 8.8.4.4;
// Quad9: 9.9.9.9 and 149.112.112.112.

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
            <SideBar />
            
            <div className='content-container'>
                optimizing-code
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
