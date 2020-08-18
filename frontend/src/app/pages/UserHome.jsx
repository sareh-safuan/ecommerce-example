import React from 'react'
import Col from 'react-bootstrap/Col'

import Spinner from '../components/core/Spinner'

const UserHome = ({ showAlert }) => {
    return (
        <Col md={9} xs={12}>
            <Spinner loading={false} />
            <button onClick={
                () => showAlert({
                    show: true,
                    variant: 'success',
                    text: 'FIRE FORCE!!!'
                })
            }>
                Click
            </button>
        </Col>
    )
}

export default UserHome