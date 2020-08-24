import React from 'react'
import Media from 'react-bootstrap/Media'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

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
        const url = this.props.url

        axios({
            method: 'GET',
            url
        })
            .then(res => {
                const orderDetails = res.data.data

                this.setState({
                    orderDetails,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { loading, orderDetails } = this.state

        if (loading) {
            return (
                <Spinner loading={loading} />
            )
        }

        if (orderDetails.length) {
            const ref = Date.now()
            const tpp = orderDetails[0].total_price_paid

            return (
                <Card className="mb-2 card-shadow">
                    <Card.Header>
                        <div>Order No: {ref}</div>
                        <div>Price: RM {tpp}</div>
                    </Card.Header>
                    <Card.Body>
                        {
                            orderDetails.map((odr, idx) => (
                                <Media key={idx} className="mt-2">
                                    <img
                                        src={process.env.REACT_APP_IMAGE_URL + odr.image}
                                        width={64}
                                        height={50}
                                        alt="image_not_found"
                                        className="ml-2"
                                    />
                                    <Media.Body className="ml-3">
                                        <div>
                                            <small>
                                                {
                                                    odr.product_name + ' (' +
                                                    odr.variation_description + ')'
                                                }
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                {'RM ' + odr.paying_price + ' x ' + odr.quantity}
                                            </small>
                                        </div>
                                    </Media.Body>
                                </Media>
                            ))
                        }
                    </Card.Body>
                </Card>
            )
        }
    }
}

export default OrderDisplay