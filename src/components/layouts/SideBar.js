import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// icons
import { FiDatabase, FiServer, FiSettings } from 'react-icons/fi'
import TeamIcon from '../common/TeamIcon'

// style
import './sass/sidebar.scss'

const SideBar = () => {
    const dispatch = useDispatch()
    const sidebarState = useSelector(state => state.sidebar)

    console.log(sidebarState);

    return (
        <div className='sidebar-container'>
            <div className='sidebar'>
                <div className='top-level'>
                    <div className='action dns-changer selected'>
                        <FiServer />
                    </div>

                    <div className='action dns-database'>
                        <FiDatabase />
                    </div>
                </div>

                <div className="bottom-level">
                    <div className="action about">
                        <TeamIcon />
                    </div>
                    <div className='action settings'>
                        <FiSettings />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
