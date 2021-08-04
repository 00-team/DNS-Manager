import { CHANGE_SETTINGS_TAB } from "./types"

const initState = {
    tabs: [
        {
            id: 1,
            tabName: 'Settings',
            isSelected: true
        }
    ]
}

export default (state=initState, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS_TAB:
            return {
                ...state,
                tabs: action.payload
            }
        default:
            return state;
    }
}
