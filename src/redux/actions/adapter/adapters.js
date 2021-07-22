import { exec } from 'child_process'

import {
    LOADED_ADAPTERS,
    LOADING_ADAPTERS,
    SELECTED_ADAPTER,
} from './types';

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const loadAdapters = () => (dispatch) => {
    dispatch({ type: LOADING_ADAPTERS, payload: true })

    exec('powershell "Get-NetAdapter | ConvertTo-Json -Compress"', (error, stdout, stderr) => {
        if (error) {
            return dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Get Adapters ...'
            })
        }
    
        const NetAdaptersData = JSON.parse(stdout);
        if (typeof NetAdaptersData === 'object') {
            let payload = NetAdaptersData.map((item, index) => {
                return {
                    id: index,
                    adapterId: item.InterfaceIndex,
                    adapterName: item.Name,
                    status: item.Status,
                }
            })

            payload = payload.filter(item => item.status !== 'Not Present')
            
            dispatch({ type: LOADED_ADAPTERS, payload: payload })

        } else {
            dispatch({
                type: ERROR_ALERT,
                payload: 'Error to Load Data'
            })
        }

        dispatch({ type: LOADING_ADAPTERS, payload: false })
    })
}
