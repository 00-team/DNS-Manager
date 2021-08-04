import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_PAGE } from '../../redux/reducers/sidebar/types'

// icons
import { FiDatabase, FiServer, FiSettings } from 'react-icons/fi'
import TeamIcon from '../common/TeamIcon'

// style
import './sass/sidebar.scss'

const SideBar = () => {
    const dispatch = useDispatch()

    const ChangePage = (page) => dispatch({ type: CHANGE_PAGE, payload: page })

    return (
        <div className='sidebar-container'>
            <div className='sidebar'>
                <div>
                    <Action Icon={<FiServer />} onClick={() => ChangePage('dns-changer')} PageName='dns-changer' title='DNS Changer' />
                    <Action Icon={<FiDatabase />} onClick={() => ChangePage('dns-database')} PageName='dns-database' title='DNS Database' />
                </div>

                <div>
                    <Action Icon={<TeamIcon />} onClick={() => ChangePage('about')} PageName='about' title='About' />
                    <Action Icon={<FiSettings />} onClick={() => ChangePage('settings')} PageName='settings' title='Settings' />
                </div>
            </div>
        </div>
    )
}

const Action = ({ Icon, onClick, PageName, title }) => {
    const currentPage = useSelector(state => state.sidebar.page)
    return (
        <div className={'action' + (currentPage === PageName ? ' selected' : '') } 
            onClick={onClick} 
            title={title}
        >
            {Icon}
        </div>
    )
}

Action.defaultProps = {
    Icon: null,
    onClick: () => {},
    PageName: '',
    title: '',
}

export default SideBar
