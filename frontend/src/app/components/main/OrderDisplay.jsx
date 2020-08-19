import React, { Fragment } from 'react'
import Media from 'react-bootstrap/Media'
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
            return (
                <Fragment>
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
                </Fragment>
            )
        }
    }
}

export default OrderDisplay