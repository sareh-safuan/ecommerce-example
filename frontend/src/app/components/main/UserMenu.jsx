import React from 'react'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    return (
        <Col md={3} xs={12}>
            <ListGroup>
                <ListGroup.Item>
                    <Link to="/user">Home</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/user/profile">Profile</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/user/address">Address</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/user/order">Order</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/user/change-password">Change Password</Link>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

export default UserMenu