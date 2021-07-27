import React from 'react'

// redux
import { useSelector } from 'react-redux'

// style
import './sass/editor.scss'

// Tabs
import Tabs from './Tabs'

const Editor = () => {
    const currentPage = useSelector(state => state.sidebar.page);

    
    return (
        <div className='editor-container'>
            <Tabs />
            {currentPage}
        </div>
    )
}

export default Editor
