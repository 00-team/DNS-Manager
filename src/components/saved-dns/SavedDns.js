import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

import { loadSavedDns } from '../../redux/actions/saved-dns/get-saved-dns';

import './sass/saved-dns.scss'

const SavedDns = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const savedDns = useSelector(state => state.savedDns)
    const adapters = useSelector(state => state.adapters)

    useEffect(() => {
        dispatch(loadSavedDns())
    }, [dispatch])

    const SetDns = (dns1, dns2) => {
        if (!adapters.selectedAdapterId) return alert.error('wait to load dns changer')
        
        dispatch({ type: 'LOAD_DNS', payload: {
            dns1: dns1,
            dns2: dns2,
            adapterId: adapters.selectedAdapterId
        }})
    }

    const LoadingFlag = <div className='loading-box' style={{ height: '88vh', width: '60%' }} >
        <PacmanLoader color='#FFF' loading={true} css={css`width:auto;height:auto;`} />
    </div>

    const SavedDnsFlag = savedDns.savedDns && savedDns.savedDns.map((item, index) => 
    <div key={index} className='saved-dns' onClick={() => {SetDns(item.preferred_dns, item.alternate_dns)}}>
        <span className='name' id='name'>{item.name}</span>
    </div>)

    return (
        <div className='saved-dns-container'>
            {savedDns.loading ? LoadingFlag : (savedDns.savedDns && SavedDnsFlag)}
        </div>
    )
}

export default SavedDns
