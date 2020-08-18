import React from 'react'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import Form from 'react-bootstrap/Form'

import Spinner from '../components/core/Spinner'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: {},
            loading: true,
            plaintext: true
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/user/5'
        })
            .then(res => {
                const profile = res.data.data[0]

                this.setState({
                    profile,
                    loading: false
                })
            })
            .catch(err => {
                this.props.showAlert({
                    show: true,
                    variant: 'danger',
                    text: 'Unexpected error. Please try again.'
                })
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        const { loading, profile, plaintext } = this.state

        if (!profile.hasOwnProperty('id')) {
            return <span></span>
        }

        return (
            <Col md={9} xs={12}>
                <Spinner loading={loading} />
                <Form className="mt-2 ml-2">
                    <Form.Group>
                        <Form.Label>
                            <strong>First Name:</strong>
                        </Form.Label>
                        <Form.Control plaintext={plaintext} defaultValue={profile.first_name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Last Name:</strong>
                        </Form.Label>
                        <Form.Control plaintext={plaintext} defaultValue={profile.last_name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Email:</strong>
                        </Form.Label>
                        <Form.Control plaintext={plaintext} defaultValue={profile.email} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Phone Number:</strong>
                        </Form.Label>
                        <Form.Control plaintext={plaintext} defaultValue={profile.phone_number} />
                    </Form.Group>
                </Form>
            </Col>
        )
    }
}

export default UserProfile