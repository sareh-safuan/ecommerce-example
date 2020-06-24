import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Ul, Li } from '../Core.jsx'
import logo from '../../logo.png'

class TheHeader extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        const { total } = this.props

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
                            <Link to="/cart">{`Cart(${total})`}</Link>
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
    return { total: state.total }
}

const Header = connect(mapStateToProps)(TheHeader)

export default Header