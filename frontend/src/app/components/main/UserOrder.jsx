import React from 'react'
import axios from 'axios'
import { Li, Card, CardTitle, CardBody } from '../../Core.jsx'

class Order extends React.Component {
    constructor() {
        super()
        this.state = { orders: [] }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')

        axios({
            url: '/order/' + userId
        })
            .then(res => {
                if(!res.data.success) {
                    throw new Error()
                }

                this.setState({ orders: res.data.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { orders } = this.state

        if(!orders.length) {
            return <div>Loading...</div>
        }

        return (
            <Wrapper>
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
                                                        src={'http://localhost:4000/' + product.image}
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