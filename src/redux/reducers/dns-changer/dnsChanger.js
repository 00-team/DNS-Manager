import { 
    LOADING_DNS_CHANGER,
    LOAD_DNS_CHANGER
} from "./types";

const initState = {
    loading: true,
    tabs: []
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