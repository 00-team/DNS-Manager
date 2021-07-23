import {
    LOADING_SAVED_DNS,
    LOAD_SAVED_DNS
} from '../../actions/saved-dns/types';


const initialState = {
    savedDns: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_SAVED_DNS:
            return {
                ...state,
                loading: action.payload,
            };
        case LOAD_SAVED_DNS:
            return {
                ...state,
                savedDns: action.payload,
            };
        default:
            return state;
    }
}