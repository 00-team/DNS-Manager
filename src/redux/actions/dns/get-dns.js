import { exec } from 'child_process'

import {
    LOADING_DNS,
    LOAD_DNS
} from './types';

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const loadDns = (adapterId) => (dispatch) => {
    dispatch({ type: LOADING_DNS, payload: true })

    exec(`powershell "Get-DnsClientServerAddress -InterfaceIndex ${adapterId} -AddressFamily IPv4 | ConvertTo-Json -Compress"`, (error, stdout, stderr) => {
        if (error) {
            dispatch({ type: LOADING_DNS, payload: false })
            return dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Load Dns for thid adapter'
            })
        }
    
        const DnsData = JSON.parse(stdout);
        if (typeof DnsData === 'object' && typeof DnsData !== null) {
            let payload = {
                dns1: '',
                dns2: '',
                adapterId: DnsData.InterfaceIndex
            }

            if (DnsData.Address.length === 2) {
                payload.dns1 = DnsData.Address[0]
                payload.dns2 = DnsData.Address[1]
            }

            dispatch({ type: LOAD_DNS, payload: payload })
        } else {
            dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Load Data'
            })
        }

        dispatch({ type: LOADING_DNS, payload: false })
    })
}
