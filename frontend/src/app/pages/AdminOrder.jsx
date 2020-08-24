import React from 'react'
import axios from 'axios'
import uniqid from 'uniqid'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'

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
                <Table responsive striped style={{ fontSize: '14px' }}>
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">#</th>
                            <th className="col-2">Reference</th>
                            <th className="col-3">Payment</th>
                            <th className="col-3">Amount</th>
                            <th className="col-2">Status</th>
                            <th className="col-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((odr, idx) => (
                                <tr key={idx} className="d-flex">
                                    <td className="col-1"></td>
                                    <td className="col-2">{uniqid().toUpperCase()}</td>
                                    <td className="col-3">Credit Card</td>
                                    <td className="col-3">RM {odr.total_price_paid}</td>
                                    <td className="col-2">{fake()}</td>
                                    <td className="col-1">
                                        <Link
                                            className="btn btn-sm btn-outline-secondary"
                                            to={`/admin/order/${odr.id}/${odr.user_id}/${odr.address_id}`}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        )
    }
}

const fake = () => {
    return (
        <Badge variant="success">
            PAID
        </Badge>
    )
}

export default AdminOrder