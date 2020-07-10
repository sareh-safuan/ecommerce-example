import { ADD_TO_CART, SUCCESS_LOGIN } from './action'
import { combineReducers } from 'redux'

const cartState = {
    cart: [
        {
            product_name: 'Apple',
            image: 'apple.jpg',
            payingPrice: 23.01,
            quantity: 1
        }
    ]
}

function cartReducer(state = cartState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                cart: [
                    ...state.cart,
                    action.cart
                ]
            }

        default:
            return state
    }
}

const authState = {
    isUserLogin: false
}

function authReducer(state = authState, action) {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return {
                isUserLogin: action.auth
            }
        default:
            return state
    }
}

const reducers =  combineReducers({
    cart: cartReducer,
    auth: authReducer
})


export default reducers