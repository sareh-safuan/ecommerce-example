import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Ul, Li } from '../Core.jsx'
import logo from '../../images/logo.png'

class TheHeader extends React.Component {

    render() {
        const { cart: { cart }, auth: { isUserLogin } } = this.props
        let quantity = 0

        for (let i of cart) {
            quantity += i.quantity
        }

        const account = isUserLogin ?
            (<Link to="/user">Account</Link>) :
            (<Link to="/sign-in">Account</Link>)

        return (
            <HeaderWrapper>
                <NavLogo>
                    <Link to="/">
                        <img src={logo} width="120px" alt="main-logo" />
                    </Link>
                </NavLogo>
                <NavLinkHorizontal>
                    <Ul>
                        <Li className="nav-link-item">
                            <Link to="/">Home</Link>
                        </Li>
                        <Li className="nav-link-item">
                            <Link to="/cart">{`Cart(${quantity})`}</Link>
                        </Li>
                        <Li className="nav-link-item">
                            {account}
                        </Li>
                    </Ul>
                </NavLinkHorizontal>
            </HeaderWrapper>
        )
    }
}

const HeaderWrapper = ({ children }) => (
    <header>
        <nav>
            {children}
        </nav>
    </header>
)

const NavLogo = ({ children }) => (
    <div className="nav-logo">
        {children}
    </div>
)

const NavLinkHorizontal = ({ children }) => (
    <div className="nav-link">
        <div className="pure-menu pure-menu-horizontal">
            {children}
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        auth: state.auth
    }
}

const Header = connect(mapStateToProps)(TheHeader)

export default Header