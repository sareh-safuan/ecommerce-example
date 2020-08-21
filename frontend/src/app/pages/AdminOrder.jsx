import React from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import Spinner from '../components/core/Spinner'

class AdminOrder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/order',
        })
            .then(res => {
                const orders = res.data.data

                this.setState({
                    loading: false,
                    orders
                })
            })
            .catch(err => {
                this.props.showAlert({
                    show: true,
                    variant: 'danger',
                    text: 'Unexpected error.'
                })
            })
    }

    render() {
        const { loading, orders } = this.state

        if (!orders.length) {
            return <span></span>
        }

        return (
            <Col>
                <Spinner loading={loading} />
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                        {
                            orders.map((odr, idx) => (
                                <tr key={idx}>
                                    <td>{odr.id}</td>
                                    <td>TODO</td>
                                    <td>RM {odr.total_price_paid}</td>
                                    <td>some link</td>
                                </tr>
                            ))
                        }
                    </thead>
                </Table>
            </Col>
        )
    }
}

export default AdminOrder