import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart'
import Index from './pages/Index'

const Body = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Index />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/cart">
                <Cart />
            </Route>
        </Switch>
    )
} 

export default Body