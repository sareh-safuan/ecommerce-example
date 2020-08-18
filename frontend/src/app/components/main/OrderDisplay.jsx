import React from 'react'
// import Card from 'react-bootstrap/Card'
import axios from 'axios'

import Spinner from '../core/Spinner'

class OrderDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orderDetails: [],
            loading: true
        }
    }

    componentDidMount() {
        const id = this.props.id

        axios({
            method: 'GET',
            url: '/user/8/order/' + id
        })
            .then(res => {
                const orderDetails = res.data.data

                console.log(orderDetails)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { loading } = this.state

        return (
            <Spinner loading={loading} />
        )
    }
}

export default OrderDisplay