export const ADD_TO_CART = 'ADD_TO_CART'
export const EMPTY_THE_CART = 'EMPTY_THE_CART'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'

export function addToCart (cart) {
    return { type: ADD_TO_CART, cart }
}

export function emptyTheCart () {
    return { type: EMPTY_THE_CART }
}

export function successLogin (auth) {
    return { type: SUCCESS_LOGIN, auth }
}