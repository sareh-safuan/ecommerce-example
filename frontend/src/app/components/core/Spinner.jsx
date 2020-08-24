import React from 'react'
import { Nav, Spinner as BSSpinner, Card } from 'react-bootstrap/'

const Spinner = ({ loading }) => {

    if (loading) {
        return (
            <Card>
                <Card.Body>
                    <Nav className="justify-content-center">
                        <BSSpinner animation="border" variant="success" />
                    </Nav>
                </Card.Body>
            </Card>
        )
    }

    return (
        <span></span>
    )
}

export default Spinner