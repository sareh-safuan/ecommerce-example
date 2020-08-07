import React from 'react'
import axios from 'axios'
import { Li, Card, CardTitle, CardBody, Alert } from '../../Core.jsx'

class Order extends React.Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            alertType: '',
            alertText: '',
            isLoading: true
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            this.setState({
                isLoading: false,
                alertType: 'alert-danger',
                alertText: 'Unexpected error.'
            })
            return
        }

        axios({
            url: '/order/' + userId
        })
            .then(res => {
                if (!res.data.success) {
                    throw new Error()
                }

                this.setState({
                    isLoading: false,
                    orders: res.data.data
                })
            })
            .catch(err => {
                this.setState({
                    alertType: 'alert-danger',
                    alertText: 'Access forbidden.'
                })
            })
    }

    render() {
        const { orders, alertType, alertText, isLoading } = this.state

        if (isLoading && alertType === '') {
            return <div>Loading...</div>
        }

        if (!orders.length) {
            return <h4>You don't have any order yet.</h4>
        }

        return (
            <Wrapper>
                <Alert className={alertType}>
                    {alertText}
                </Alert>
                {
                    orders.map((order, i) => (
                        <Li key={i}>
                            <Card className="card-shadow">
                                <CardBody>
                                    <CardTitle>
                                        <h5>{order.id}</h5>
                                        <small>Order On: {order.created_at}</small>
                                    </CardTitle>
                                    {
                                        order.products.map((product, j) => (
                                            <div className="row" key={j}>
                                                <div className="width-10">
                                                    <img alt="Not Found" className="img-responsive"
                                                        src={process.env.REACT_APP_IMAGE_URL + product.image}
                                                    />
                                                </div>
                                                <div className="width-90">
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <div>{`${product.product_name} (${product.variation_description}) x ${product.quantity}`}</div>
                                                        <div>RM {(product.paying_price).toFixed(2)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="row-end">
                                        <div>
                                            <div>Total: RM {(order.total_price_paid).toFixed(2)}</div>
                                            <div>{order.status}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Li>
                    ))
                }
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => (
    <div className="width-80">
        <div className="my-order">
            <div className="pure-menu-list">
                {children}
            </div>
        </div>
    </div>
)

export default Order