import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Ul, Li } from '../Core.jsx'
import logo from '../../images/logo.png'

class TheHeader extends React.Component {

    render() {
        const { cart } = this.props.cart
        let quantity = 0

        for (let i of cart) {
            quantity += i.quantity
        }

        return (
            <HeaderWrapper>
                <NavLogo>
                    <Link to="/">
                        <img src={logo} width="120px" alt="" />
                    </Link>
                </NavLogo>
                <NavLinkHorizontal>
                    <Ul>
                        <Li css="nav-link-item">
                            <Link to="/">Home</Link>
                        </Li>
                        <Li css="nav-link-item">
                            <Link to="/cart">{`Cart(${quantity})`}</Link>
                        </Li>
                        <Li css="nav-link-item">
                            <Link to="/sign-in">Account</Link>
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
    return { cart: state.cart }
}

const Header = connect(mapStateToProps)(TheHeader)

export default Header