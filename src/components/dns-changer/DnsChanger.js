import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useAlert } from 'react-alert'

import Input from '../common/Input'
import Button from '../common/Button'

import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

import { loadDns } from '../../redux/actions/dns/get-dns'
import { resetDns } from '../../redux/actions/dns/reset-dns'
import { changeDns } from '../../redux/actions/dns/change-dns'

import './sass/dns-changer.scss'

// 178.22.122.100
// 185.51.200.2


const DnsChanger = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [dnsServers, setDnsServers] = useState({ dns1 : '' , dns2 : ''})
    const adapters = useSelector(state => state.adapters)
    const adapterDns = useSelector(state => state.adapterDns)
    const alerts = useSelector((state) => state.alerts);


    useEffect(() => {
        if (alerts.info) {alert.info(alerts.info); dispatch({ type: 'INFO_ALERT', payload: null });}
        if (alerts.error) {alert.error(alerts.error); dispatch({ type: 'ERROR_ALERT', payload: null });}
        if (alerts.success) {alert.success(alerts.success); dispatch({ type: 'SUCCESS_ALERT', payload: null });}
    }, [alerts])

    useEffect(() => {
        if (adapters.selectedAdapterId !== null) {
            dispatch(loadDns(adapters.selectedAdapterId))
        }
    }, [dispatch, adapters])

    useEffect(() => {
        if (adapterDns.adapterId && adapterDns.adapterId === adapters.selectedAdapterId) {
            setDnsServers({dns1: adapterDns.dns1, dns2: adapterDns.dns2 })
        }
    }, [adapterDns])

    const LoadingFlag = <div className='loading-box' style={{ height: '90vh', width: '80%' }} >
        <PacmanLoader color='#FFF' loading={true} css={css`width:auto;height:auto;`} />
    </div>


    const DnsChangerFlag = 
    <div className="dns-changer">
        <div className='dns'>
            <span>DNS 1</span>
            <Input type='ipv4' onChange={ip => setDnsServers({...dnsServers, dns1: ip})} defaultValue={dnsServers.dns1} />
        </div>
        <div className='dns'>
            <span>DNS 2</span>
            <Input type='ipv4' onChange={ip => setDnsServers({...dnsServers, dns2: ip})} defaultValue={dnsServers.dns2} />
        </div>
        <div className='actions'>
            <Button onClick={() => console.log(dnsServers)}> Save DNS </Button>

            <Button onClick={() => {
                if (adapterDns.adapterId) {
                    dispatch(changeDns(adapterDns.adapterId, dnsServers.dns1, dnsServers.dns2))
                }
            }}> Change DNS </Button>

            <Button onClick={() => {
                if (adapterDns.adapterId) {
                    dispatch(resetDns(adapterDns.adapterId))
                }
            }} > Reset DNS </Button>

        </div>
    </div>

    return (
        <div className='dns-changer-container'>
            {adapterDns.loading ? LoadingFlag : (adapterDns.adapterId ? DnsChangerFlag : <></>)}
        </div>
    )
}

export default DnsChanger
