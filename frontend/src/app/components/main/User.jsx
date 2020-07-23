import React from 'react'
import { Link, Route } from 'react-router-dom'
import Profile from './UserProfile.jsx'
import Address from './UserAddress.jsx'
import Order from './UserOrder.jsx'
// import Security from './UserSecurity.jsx'

const User = (props) => {
        return (
            <Wrapper>
                <SideMenu />
                <Route exact path="/user" component={Profile} />
                <Route path="/user/address" component={Address} />
                <Route path="/user/orders" component={Order} />
                {/* <Route path="/user/change-password" component={Security} /> */}
            </Wrapper>
        )
}

const Wrapper = ({ children }) => {
    return (
        <div className="container">
            <div className="row">
                {children}
            </div>
        </div>
    )
}

const SideMenu = () => {
    return (
        <div className="width-20">
            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                    <Link to="/user">Profile</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/user/address">Address</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/user/orders">Orders</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/user/change-password">Change Password</Link>
                </li>
            </ul>
        </div>
    )
}

export default User