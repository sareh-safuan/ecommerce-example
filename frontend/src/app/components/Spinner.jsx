import React from 'react'
import { Nav, Spinner as BSSpinner } from 'react-bootstrap/'

const Spinner = ({ loading }) => {

    if (loading) {
        return (
            <Nav className="justify-content-center">
                <BSSpinner animation="border" variant="success"/>
            </Nav>
        )
    }
    
    return (
        <span></span>
    )
}

export default Spinner