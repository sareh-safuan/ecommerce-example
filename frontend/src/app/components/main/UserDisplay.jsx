import React from 'react'
import Card from 'react-bootstrap/Card'

import Spinner from '../core/Spinner'

const UserDisplay = ({ usr }) => {

    if (!Object.keys(usr).length) {
        return <Spinner loading={true} />
    }

    return (
        <Card className="card-shadow">
            <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <div>{usr.first_name + ' ' + usr.last_name}</div>
                <div>{usr.email}</div>
                <div>{usr.phone_number}</div>
            </Card.Body>
        </Card>
    )
}

export default UserDisplay