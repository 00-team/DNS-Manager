import { 
    LOAD_DNS_DATABASE,
    LOADING_DNS_DATABASE,
} from "./types";

const initState = {
    dnsList: [
        { id: 1, tabName: 'Google', dns1: '8.8.8.8', dns2: '8.4.4.8', isSelected: true },
        { id: 2, tabName: 'Cloudflare', dns1: '1.1.1.1', dns2: '1.0.0.1', isSelected: false },
        { id: 3, tabName: 'Random', dns1: '7.7.7.7', dns2: '7.6.6.7', isSelected: false },
    ],
    loading: false
}

export default (state=initState, action) => {
    switch (action.type) {
        case LOADING_DNS_DATABASE:
            return {
                ...state,
                loading: action.payload
            }
        case LOAD_DNS_DATABASE:
            return {
                ...state,
                dnsList: action.payload
            }
        default:
            return state;
    }
}