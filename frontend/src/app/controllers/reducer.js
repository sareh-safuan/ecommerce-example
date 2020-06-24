import { ADD_TO_CART } from './action'

const initialState = {
    total: 0
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                total: (state.total + action.total)
            }

        default:
            return state
    }
}

export default rootReducer