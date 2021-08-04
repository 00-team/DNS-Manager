import { exec } from 'child_process'
import ChechDns from '../../../ChechDns';

import {
    LOADING_DNS_CHANGER,
    LOAD_DNS_CHANGER
} from '../../reducers/dns-changer/types';


import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../../reducers/base/types'


const SendError = (dispatch, msg='Error ...') => dispatch({ type: ERROR_ALERT, payload: msg })
const Loading = (dispatch, isLoading=true) => dispatch({ type: LOADING_DNS_CHANGER, payload: isLoading })

export const loadTabs = () => (dispatch) => {
    Loading(dispatch)

    exec('powershell "Get-NetAdapter | ConvertTo-Json -Compress"', (error, stdout, stderr) => {
        if (error) {
            Loading(dispatch, false)
            return SendError(dispatch, 'Error to Load Adapters')
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
                        return SendError(dispatch, 'Error to load dns\'s')
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
                        SendError(dispatch, 'Error to get Dns Data')
                    }

                    finalSend()
                }

                exec(`powershell "Get-DnsClientServerAddress -InterfaceIndex ${item.InterfaceIndex} -AddressFamily IPv4 | ConvertTo-Json -Compress"`, LoadDnsData)

                return tab

            }).filter(item => item !== null)

            const finalSend = () => dispatch({ type: LOAD_DNS_CHANGER, payload: payload })

        } catch (error) {
            SendError(dispatch, 'Error to Load Data')
        }

        Loading(dispatch, false)
    })
}

export const ChangeDns = (data) => (dispatch) => {
    Loading(dispatch)
    
    if (data.action === 'reset') {
        exec(`powershell Set-DnsClientServerAddress -InterfaceIndex ${data.id} -ResetServerAddresses`, (error, stdout, stderr) => {
            if (error) {
                console.log(error, stderr);
                let msg = 'Error To Reset Dns'
    
                if (stderr.search('PermissionDenied') !== -1) msg = 'You Shoud run app as administrator for Reset DNS'
                
                Loading(dispatch, false)
                return SendError(dispatch, msg)
            } else {
                dispatch({ type: SUCCESS_ALERT, payload: 'Successfully DNS Reseted' })
            }

            dispatch(loadTabs())
        })
    } else if (data.action === 'change') {
        if (ChechDns(data.dns1) && ChechDns(data.dns2)) {
            exec(`powershell Set-DnsClientServerAddress -InterfaceIndex ${data.id} -ServerAddresses ('${data.dns1}','${data.dns2}')`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error, stderr);
                    let msg = 'Error To Change Dns'
        
                    if (stderr.search('PermissionDenied') !== -1) msg = 'You Shoud run app as administrator for Change DNS'
                    
                    Loading(dispatch, false)
                    return SendError(dispatch, msg)
                } else {
                    dispatch({ type: SUCCESS_ALERT, payload: 'Successfully DNS Changed' })
                }

                dispatch(loadTabs())
            })
        } else {
            Loading(dispatch, false)
            SendError(dispatch, 'Your dns is not valid')
        }
    }
}