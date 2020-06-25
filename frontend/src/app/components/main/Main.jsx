import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './Index.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import User from './User.jsx'
import Cart from './Cart.jsx'
import Product from './Product'

class Main extends React.Component {

    render() {

        return (
            <Wrapper>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/product" component={Product} />
                    <Route path="/cart" component={Cart} />        
                    <Route path="/sign-in" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/user" component={User} />
                </Switch>
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => {
    return (
        <main>
            <div className="empty-50"></div>
            <div className="row-center">
                {children}
            </div>
            <div className="empty-50"></div>
        </main>
    )
}

export default Main