import { CHANGE_PAGE } from "./types"

const allowPages = ['dns-changer', 'dns-database', 'settings', 'about']

const initState = {
    page: 'dns-changer',
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