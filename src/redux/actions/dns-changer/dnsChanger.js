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

    const SendError = (msg='Error ...') => dispatch({ type: ERROR_ALERT, payload: msg })
    const Loading = (isLoading=true) => dispatch({ type: LOADING_DNS_CHANGER, payload: isLoading })

    Loading()

    exec('powershell "Get-NetAdapter | ConvertTo-Json -Compress"', (error, stdout, stderr) => {
        if (error) {
            Loading(false)
            return SendError('Error to Load Adapters')
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
                    dns1: '',
                    dns2: ''
                }
                index += 1

                const LoadDnsData = (error, stdout, stderr) => {
                    if (error) {
                        finalSend()
                        return SendError('Error to load dns\'s')
                    }

                    const DnsData = JSON.parse(stdout);
                    try {
                        if (DnsData.Address && typeof DnsData.Address === 'object') {
                            if (DnsData.Address.length === 2) {
                                tab.dns1 = DnsData.Address[0]
                                tab.dns2 = DnsData.Address[1]
                            }
                        }
                    } catch (error) {
                        dispatch({
                            type: ERROR_ALERT,
                            payload: 'Error to Dns data'
                        })
                    }

                    finalSend()
                }

                exec(`powershell "Get-DnsClientServerAddress -InterfaceIndex ${item.InterfaceIndex} -AddressFamily IPv4 | ConvertTo-Json -Compress"`, LoadDnsData)

                return tab

            }).filter(item => item !== null)

            const finalSend = () => dispatch({ type: LOAD_DNS_CHANGER, payload: payload })

        } catch (error) {
            SendError('Error to Load Data')
        }

        Loading(false)
    })
}
