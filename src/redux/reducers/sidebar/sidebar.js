import { CHANGE_PAGE } from "./types"

const allowPages = ['dns-changer', 'dns-database', 'settings']

const initState = {
    page: 'settings', // dns-changer, dns-database, settings
}

export default function (state = initState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            if (allowPages.includes(action.payload)) {
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