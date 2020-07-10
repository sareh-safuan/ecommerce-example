export const ADD_TO_CART = 'ADD_TO_CART'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'

export function addToCart (cart) {
    return { type: ADD_TO_CART, cart }
}

export function successLogin (auth) {
    return { type: SUCCESS_LOGIN, auth }
}