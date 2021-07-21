import React from 'react'
import ReactDOM from 'react-dom';

import Header from './components/layouts/Header'

import './components/sass/base.scss'

const App = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', color: '#FFF' }}>
            <Header />
            xx
        </div>
    )
}

export default App


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)
