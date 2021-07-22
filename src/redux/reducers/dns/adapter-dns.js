import {
    LOADING_DNS,
    LOAD_DNS
} from '../../actions/dns/types';


const initialState = {
    adapterId: null,
    dns1: null,
    dns2: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DNS:
            return {
                ...state,
                loading: action.payload,
            };
        case LOAD_DNS:
            return {
                ...state,
                adapterId: action.payload.adapterId,
                dns1: action.payload.dns1,
                dns2: action.payload.dns2,
            };
        default:
            return state;
    }
}