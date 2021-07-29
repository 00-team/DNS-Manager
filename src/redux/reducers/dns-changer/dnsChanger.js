import { 
    LOADING_DNS_CHANGER,
    LOAD_DNS_CHANGER
} from "./types";

const initState = {
    loading: false,
    tabs: [
        {
            id: 1,
            tabName: 'Cloudflare DNS',
            isSelected: true,
            dns1: '1.1.1.1',
            dns2: '1.0.0.1'
        },
        {
            id: 2,
            tabName: 'Google DNS',
            isSelected: false,
            dns1: '8.8.8.8',
            dns2: '8.4.4.8'
        },
        {
            id: 3,
            tabName: 'None',
            isSelected: false,
            dns1: '',
            dns2: ''
        },
    ]
}


export default (state=initState, action) => {
    switch (action.type) {
        case LOAD_DNS_CHANGER:
            return {
                ...state,
                tabs: action.payload
            }
        case LOADING_DNS_CHANGER:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}