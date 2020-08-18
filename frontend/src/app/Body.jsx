import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart'
import Index from './pages/Index'
import Product from './pages/Product'

const Body = () => {
    return (
        <Container fluid>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/product/:id/:slug" component={Product} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </Container>
    )
}

export default Body