import React from 'react'

// style
import './sass/tabs.scss'


const Tabs = ({ TabList, SetCurrentTab }) => {
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
            <div className='tabs'>
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
                {TabName}
            </div>
        </div>
    )
}

Tab.defaultProps = {
    isSelected: false,
}

export default Tabs
