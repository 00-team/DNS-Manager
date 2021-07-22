import {
    SELECTED_ADAPTER,
} from '../../actions/adapter/types';


const initialState = {
    adapterId: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECTED_ADAPTER:
            return {
                ...state,
                adapterId: action.payload,
            };
        default:
            return state;
    }
}