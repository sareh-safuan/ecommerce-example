import React from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'

import Spinner from '../components/core/Spinner'
import AddressDisplay from '../components/main/AddressDisplay'

class UserAddress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addresses: [],
            loading: true
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/user/8/address'
        })
            .then(res => {
                const addresses = res.data.data

                this.setState({
                    addresses,
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
        const { loading, addresses } = this.state

        if (!addresses.length) {
            return <span></span>
        }

        return (
            <Col md={9} xs={12}>
                <Spinner loading={loading} />
                {
                    addresses.map((addr, idx) => (
                        <AddressDisplay addr={addr} key={idx} />
                    ))
                }
            </Col>
        )
    }
}

export default UserAddress