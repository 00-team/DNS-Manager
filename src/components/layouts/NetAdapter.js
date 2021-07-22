import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

import { loadAdapters } from '../../redux/actions/adapter/adapters';

import './sass/net-adapter.scss'


const NetAdapter = () => {
    const [adapters, setAdapters] = useState([])
    const stateAdapters = useSelector(state => state.adapters)
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof stateAdapters.adapters === 'object' && stateAdapters.adapters !== null) {
            setAdapters(stateAdapters.adapters)
        }
    }, [stateAdapters])

    useEffect(() => {
        dispatch(loadAdapters())
    }, [dispatch])

    const ChaneSelected = (adapter_id) => {
        dispatch({ type: 'SELECTED_ADAPTER', payload: adapter_id })
    }

    const LoadingFlag = <div className='loading-box' style={{ height: '88vh', width: '60%' }} >
        <PacmanLoader color='#FFF' loading={true} css={css`width:auto;height:auto;`} />
    </div>

    const AdaptersFlag = adapters.map(item => 
        <div key={item.id} className={'adapter' + (item.adapterId === stateAdapters.selectedAdapterId ? ' selected' : '')} 
            onClick={() => ChaneSelected(item.adapterId)}
        >
            <span className='name' id='name'>{item.adapterName}</span>
        </div>
    )

    return (
        <div className='net-adapters'>
            {stateAdapters.loading && LoadingFlag}
            {stateAdapters.adapters && (stateAdapters.adapters.length > 0 && AdaptersFlag)}
        </div>
    )
}

export default NetAdapter
