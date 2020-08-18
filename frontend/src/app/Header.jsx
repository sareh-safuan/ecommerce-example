import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import logo from '../images/logo-small.png'

const Header = () => {
    return (
        <Fragment>
            <Nav className="justify-content-center" style={{ backgroundColor: '#65995c' }}>
                <Nav.Item>
                    <Link to="/">
                        <Image src={logo} roundedCircle className="my-2" />
                    </Link>
                </Nav.Item>
            </Nav>
            <Nav className="justify-content-end mt-2 mb-4">
                <Nav.Item className="mr-4">
                    <Link to="/cart">Cart (0)</Link>
                </Nav.Item>
                <Nav.Item className="mr-4">
                    <Link to="/user">Login</Link>
                </Nav.Item>
            </Nav>
        </Fragment>
    )
}

export default Header