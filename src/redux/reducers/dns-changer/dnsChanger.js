import { 
    LOADING_DNS_CHANGER,
    LOAD_DNS_CHANGER
} from "./types";

const initState = {
    loading: false,
    tabs: [
        {
            id: 1,
            tabName: 'Tab 1',
            isSelected: true,
            dns1: '',
            dns2: ''
        }
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