import { exec } from 'child_process'

import { loadDns } from './get-dns';

import {
    LOADING_DNS
} from './types';

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const changeDns = (adapterId, dns1, dns2) => (dispatch) => {
    dispatch({ type: LOADING_DNS, payload: true })

    exec(`powershell Set-DnsClientServerAddress -InterfaceIndex ${adapterId} -ServerAddresses ('${dns1}','${dns2}')`, (error, stdout, stderr) => {
        if (error) {
            console.log(error, stderr);
            let msg = 'Error To Reset Dns'

            if (stderr.search('PermissionDenied') !== -1) msg = 'You Shoud run app as admin for Reset or Change DNS'

            dispatch({
                type: ERROR_ALERT,
                payload: msg
            })
        } else {
            dispatch({ type: SUCCESS_ALERT, payload: 'successfully change dns' })
        }

        dispatch({ type: LOADING_DNS, payload: false })

        dispatch(loadDns(adapterId))

    })
}
