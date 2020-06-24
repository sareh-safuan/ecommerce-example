export const ADD_TO_CART = 'ADD_TO_CART'

export function addToCart (total) {
    return { type: ADD_TO_CART, total }
}