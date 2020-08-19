import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const AdminMenu = () => {
    return (
        <Col md={3} xs={12}>
            <ListGroup>
                <ListGroup.Item>
                    <Link to="/admin">Dashboard</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/admin/order">Order</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/admin/product">Product</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/admin/user">User</Link>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

export default AdminMenu