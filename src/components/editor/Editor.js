import React from 'react'

// redux
// import { useSelector } from 'react-redux'

// style
import './sass/editor.scss'

// Tabs
// import Tabs from './Tabs'

const Editor = ({ children }) => {
    // const currentPage = useSelector(state => state.sidebar.page);
    return (
        <div className='editor-container'>
            {children}
        </div>
    )
}

Editor.defaultProps = {
    Tabs: null,
}

export default Editor
