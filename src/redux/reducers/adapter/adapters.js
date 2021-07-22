import {
    SELECTED_ADAPTER,
    LOADED_ADAPTERS,
    LOADING_ADAPTERS,
} from '../../actions/adapter/types';


const initialState = {
    selectedAdapterId: null,
    adapters: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECTED_ADAPTER:
            return {
                ...state,
                selectedAdapterId: action.payload,
            };
        case LOADED_ADAPTERS:
            return {
                ...state,
                adapters: action.payload,
            };
        case LOADING_ADAPTERS:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}