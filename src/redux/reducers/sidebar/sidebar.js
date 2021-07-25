import { SHOW_ABOUT, CHANGE_PAGE } from "./types"

const initState = {
    isAboutShow: false,
    page: 'dns-changer', // dns-changer, dns-database, settings
}

export default function (state = initState, action) {
    switch (action.type) {
        case SHOW_ABOUT:
            return {
                ...state,
                isAboutShow: Boolean(action.payload)
            }
        case CHANGE_PAGE:
            if (['dns-changer', 'dns-database', 'settings'].includes(action.payload)) {
                return {
                    ...state,
                    page: action.payload
                }
            } else {
                return state
            }
        default:
            return state
    }
}