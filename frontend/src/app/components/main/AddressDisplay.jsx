import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AddressDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            update: false
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        
    }

    render() {
        const { addr } = this.props
        const { update } = this.state

        if (!update) {
            return (
                <Card className="mb-2 card-shadow">
                    <Card.Body>
                        <Card.Title>{'# ' + addr.tag}</Card.Title>
                        <div>{addr.address_one}</div>
                        <div>{addr.address_two}</div>
                        <div>{addr.city}</div>
                        <div>{addr.postcode}</div>
                        <div>{addr.state}</div>
                        <Button
                            variant="outline-success"
                            onClick={() => { this.setState({ update: true }) }}
                            className="mt-2"
                            size="sm"
                        >
                            Click to edit
                        </Button>
                    </Card.Body>
                </Card>
            )
        }

        return (
            <Card className="mb-2 card-shadow">
                <Card.Body>
                    <Card.Title>{'# ' + addr.tag}</Card.Title>
                    <Form.Control
                        defaultValue={addr.address_one}
                        className="mb-2"
                        size="sm"
                    />
                    <Form.Control
                        defaultValue={addr.address_two}
                        className="mb-2"
                        size="sm"
                    />
                    <Form.Control
                        defaultValue={addr.city}
                        className="mb-2"
                        size="sm"
                    />
                    <Form.Control
                        defaultValue={addr.postcode}
                        className="mb-2"
                        size="sm"
                    />
                    <Form.Control
                        defaultValue={addr.state}
                        className="mb-2"
                        size="sm"
                    />
                    <Button variant="success" size="sm">Submit</Button>
                    <Button
                        variant="outline-secondary"
                        className="ml-2" size="sm"
                        onClick={() => { this.setState({ update: false }) }}
                    >
                        Cancel
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

export default AddressDisplay