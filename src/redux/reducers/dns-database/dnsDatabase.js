import { 
    LOAD_DNS_DATABASE,
    LOADING_DNS_DATABASE,
} from "./types";

const initState = {
    dnsList: [],
    loading: true,
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