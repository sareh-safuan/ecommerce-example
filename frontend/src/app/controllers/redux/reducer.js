import { ADD_TO_CART } from './action'
import { combineReducers } from 'redux'

import apple from '../../../images/apple.jpg'
import apricot from '../../../images/apricot.jpg'
import banana from '../../../images/banana.jpg'
import guava from '../../../images/guava.jpg'
import honeydew from '../../../images/honeydew.jpg'
import kiwi from '../../../images/kiwi.jpg'
import lemon from '../../../images/lemon.jpg'
import mango from '../../../images/mango.jpg'
import orange from '../../../images/orange.jpg'
import papaya from '../../../images/papaya.jpg'
import pineapple from '../../../images/pineapple.jpg'
import strawberry from '../../../images/strawberry.jpg'

const cartState = {
    cart: []
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

const fruitState = {
    fruits: [
        {
            image: apple,
            name: 'Apple',
            price: 30,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
        },
        {
            image: apricot,
            name: 'Apricot',
            price: 70,
            description: 'Lorem ipsum dolor sit amet.'
        },
        {
            image: guava,
            name: 'Guava',
            price: 28,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit.'
        },
        {
            image: honeydew,
            name: 'Honeydew',
            price: 105,
            description: 'Lorem ipsum dolor sit amet consectetur.'
        },
        {
            image: banana,
            name: 'Banana',
            price: 18,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
        },
        {
            image: kiwi,
            name: 'Kiwi',
            price: 88,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
        },
        {
            image: lemon,
            name: 'Lemon',
            price: 57,
            description: 'Lorem ipsum dolor sit amet consectetur.'
        },
        {
            image: mango,
            name: 'Mango',
            price: 34,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            image: orange,
            name: 'Orange',
            price: 45,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            image: strawberry,
            name: 'Straberry',
            price: 78,
            description: 'Lorem ipsum dolor sit amet.'
        },
        {
            image: papaya,
            name: 'Papaya',
            price: 28,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim?'
        },
        {
            image: pineapple,
            name: 'Pineapple',
            price: 40,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus!'
        }
    ]
}

function fruitReducer(state = fruitState, action) {
    switch (action.type) {
        default:
            return state
    }
}

const reducers =  combineReducers({
    fruits: fruitReducer,
    cart: cartReducer
})


export default reducers