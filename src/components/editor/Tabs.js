import React, { useRef } from 'react'

// style
import './sass/tabs.scss'


const Tabs = ({ TabList, SetCurrentTab }) => {
    const tabsRef = useRef(null)
    const EmptyTabs = <div className='empty-tabs'> There is no Tab to show </div>
    const TabsList = TabList.map((tab, tabIndex) => 
        <Tab 
            key={tabIndex} 
            isSelected={tab.isSelected} 
            onClick={() => SetCurrentTab(tab.id)} 
            TabName={tab.tabName} 
        />
    )

    return (
        <div className='tabs-container'>
            <div className='tabs' onWheel={e => { if (tabsRef.current) tabsRef.current.scrollLeft += e.deltaY }} ref={tabsRef}>
                {TabList.length < 1 ? EmptyTabs : TabsList}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    TabList: [],
    SetCurrentTab: () => {},
}

const Tab = ({ isSelected, onClick, TabName }) => {
    return (
        <div className={'tab-container' + (isSelected ? ' selected' : '')} onClick={onClick} >
            <div className='tab'>
                <span>{TabName}</span>
            </div>
        </div>
    )
}

Tab.defaultProps = {
    isSelected: false,
}

export default Tabs
