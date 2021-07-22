import React from 'react'
import ReactDOM from 'react-dom';

import Header from './components/layouts/Header'
import NetAdapter from './components/layouts/NetAdapter'


// redux
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
// import { getUser } from './actions/account/account';

// style
import './components/sass/base.scss'


const alertOptions = {
    position: 'top right',
    timeout: 7000,
    transition: 'fade',
    containerStyle: {
        top: window.innerWidth < 1000 ? '10px' : '70px',
        zIndex: '100',
    }
}


const App = () => {
    return (
        <>
            <Header />
            
            <div className='content-container'>
                <NetAdapter />
            </div>
        </>
    )
}

export default App


ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>, 
    document.getElementById('root')
)
