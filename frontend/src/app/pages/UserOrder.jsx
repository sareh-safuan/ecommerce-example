import React from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'

import Spinner from '../components/core/Spinner'
import OrderDisplay from '../components/main/OrderDisplay'

class UserOrder extends React.Component {
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
            url: '/user/5/order'
        })
            .then(res => {
                const orders = res.data.data

                this.setState({
                    orders,
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
        const { loading, orders } = this.state

        if (!orders.length) {
            return <span></span>
        }

        return (
            <Col md={9} xs={12}>
                <Spinner loading={loading} />
                {
                    orders.map((odr, idx) => (
                        <OrderDisplay
                            url={`/user/5/order/${odr.id}`}
                            key={idx}    
                        />
                    ))
                }
            </Col>
        )
    }
}

export default UserOrder
