import React from 'react'

// style
import './sass/tabs.scss'

const TabList = [
    {
        id: 1,
        tabName: 'Tab 1',
        isSelected: false
    },
    {
        id: 2,
        tabName: 'Tab 2',
        isSelected: true
    },
    {
        id: 3,
        tabName: 'Tab 3',
        isSelected: false
    },
]

const Tabs = () => {
    return (
        <div className='tabs-container'>
            <div className='tabs'>
                {TabList.map((tab, tabIndex) => 
                    <Tab 
                        key={tabIndex} 
                        isSelected={tab.isSelected} 
                        onClick={() => console.log(tab.id)} 
                        TabName={tab.tabName} 
                    />
                )}
            </div>
        </div>
    )
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
