import React from 'react'
import ReactDOM from 'react-dom';

import Header from './components/layouts/Header'
import SavedDNS from './components/layouts/SavedDNS'

import './components/sass/base.scss'

const App = () => {
    return (
        <>
            <Header />
            
            <div className='content-container'>
                <SavedDNS />
            </div>
        </>
    )
}

export default App


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)
