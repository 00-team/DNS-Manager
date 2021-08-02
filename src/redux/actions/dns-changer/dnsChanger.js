import { exec } from 'child_process'

import {
    LOADING_DNS_CHANGER,
    LOAD_DNS_CHANGER
} from '../../reducers/dns-changer/types';

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../../reducers/base/types'

export const loadTabs = () => (dispatch) => {
    dispatch({ type: LOADING_DNS_CHANGER, payload: true })

    exec('powershell "Get-NetAdapter | ConvertTo-Json -Compress"', (error, stdout, stderr) => {
        if (error) {
            dispatch({ type: LOADING_DNS_CHANGER, payload: false })
            return dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Get Adapters ...'
            })
        }

        try {
            var index = 0

            const NetAdaptersData = JSON.parse(stdout);
            const payload = NetAdaptersData.map(item => {
                if (item.Status !== 'Up') return null
                let tab = {
                    id: item.InterfaceIndex,
                    tabName: item.Name,
                    isSelected: index === 0 ? true : false,
                    dns1: 'x',
                    dns2: 'x'
                }
                index += 1

                const LoadDnsData = (error, stdout, stderr) => {
                    const DnsData = JSON.parse(stdout);
                    tab.dns1 = DnsData.Address[0] || ''
                    tab.dns2 = DnsData.Address[1] || ''

                    // dispatch({ type: LOAD_DNS_CHANGER, payload: payload })
                    cb()
                }

                exec(`powershell "Get-DnsClientServerAddress -InterfaceIndex ${item.InterfaceIndex} -AddressFamily IPv4 | ConvertTo-Json -Compress"`, LoadDnsData)

                return tab

            }).filter(item => item !== null)

            const cb = () => {
                dispatch({ type: LOAD_DNS_CHANGER, payload: payload }) 
            }

            // dispatch({ type: LOAD_DNS_CHANGER, payload: payload })
        } catch (error) {
            dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Load Data'
            })
        }

        dispatch({ type: LOADING_DNS_CHANGER, payload: false })
    })
}
